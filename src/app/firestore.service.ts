import {Injectable} from '@angular/core';
import firebase from "firebase/compat/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {collection, doc, getDocs, getFirestore, setDoc} from "firebase/firestore"
import {Recipe} from "./objects/recipe";
import {BehaviorSubject} from "rxjs";
import initializeApp = firebase.initializeApp;

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firebaseConfig = {
    apiKey: "AIzaSyBb3K9c0ELLOI6M8XA0XynPbFxau9zpzQU",
    authDomain: "internettechnologieminiproject.firebaseapp.com",
    projectId: "internettechnologieminiproject",
    storageBucket: "internettechnologieminiproject.appspot.com",
    messagingSenderId: "539577375802",
    appId: "1:539577375802:web:7412a498fe20568b39e903",
    measurementId: "G-GXMVKEH1XM"
  };

  private readonly app: any;
  private readonly auth: any;
  private loggedUser: any;
  private readonly db: any;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSubject.asObservable();


  getLoggedUser(){
    if (this.loggedUser != null) {
      return this.loggedUser;
    }
  }

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app)
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.loggedUser = user;
        this.isLoggedInSubject.next(true);
      } else {
        this.isLoggedInSubject.next(false);
      }
    });
    this.db = getFirestore(this.app)
  }

  async newUser(email: string, password: string): Promise<Boolean> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          this.loggedUser = userCredential.user;
        })
      return true;
    } catch(error) {
      console.log(error);
      return false;
    }
  }

  async signIn(email: string, password: string){
    try {
      await signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          this.loggedUser = userCredential.user;
        })
      return true;
    } catch (error) {
      console.log(error);
      this.isLoggedInSubject.next(false);
      return false;
    }
  }

  async addRecipe(recipe: Recipe){
    try {
      await setDoc(doc(this.db, "recipes", recipe.id + ""),{
        recipe: recipe.recipe,
        description: recipe.description,
        id: recipe.id,
        uid: recipe.uid
      });
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  async getAllRecipes() {
    const recipeList: Recipe[] = []
     const querySnapshot = await getDocs(collection(this.db, "recipes"));
     querySnapshot.forEach( (doc) => {
       recipeList.push(doc.data() as Recipe)
     })
    return recipeList
  }

  async logOut() {
    try {
      await signOut(this.auth);
      return true;
    } catch (error) {
      console.error(error);
      return false
    }
  }
}



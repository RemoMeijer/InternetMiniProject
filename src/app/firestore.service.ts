import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
import initializeApp = firebase.initializeApp;
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, query, where, getDocs, getDoc, collection } from "firebase/firestore"


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
  private auth: any;
  private loggedUser: any;
  private db: any;

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app)
    onAuthStateChanged(this.auth, (user) => {
      this.loggedUser = user;
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
      return false;
    }
  }

  async addRecipe(int : number, recipe: string){
    await setDoc(doc(this.db, "users", this.loggedUser.uid, "Recipes", recipe + int),{
      recipe: recipe,
      description: "Lekkere appeltaart!!",
    });
  }

  async getAllRecipes() {
    console.log("getting shit")
    const q = query(collection(this.db, "users"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data())
    });
  }

}



import {Injectable} from '@angular/core';
import firebase from "firebase/compat/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {collection, doc, getDocs, getFirestore, setDoc, where, query} from "firebase/firestore"
import {Recipe} from "./objects/recipe";
import {BehaviorSubject, Subject} from "rxjs";
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
  private readonly db: any;

  private allRecipes: Recipe[] = [];
  private recipeListSubject = new Subject<Recipe[]>();
  recipeList$ = this.recipeListSubject.asObservable();

  private loggedUser: any;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.isLoggedInSubject.asObservable();


  getLoggedUser() {
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
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async signIn(email: string, password: string) {
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

  async addRecipe(recipe: Recipe) {
    try {
      await setDoc(doc(this.db, "recipes", recipe.id + ""), {
        id: recipe.id,
        uid: recipe.uid,
        recipeName: recipe.recipeName,
        description: recipe.description,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        tags: recipe.tags
      });
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  // Fetch all the recipes from the db, and update local recipe list
  async getAllRecipes() {
    const recipeList: Recipe[] = []
    const querySnapshot = await getDocs(collection(this.db, "recipes"));
    querySnapshot.forEach((doc) => {
      recipeList.push(doc.data() as Recipe)
    })

    // update local list
    this.allRecipes = recipeList;

    // todo -> make everyone use the local list, not this method
    return recipeList;
  }

  getRecipeById() {
    // todo
  }

  // Return all recipes
  returnAll() {
    this.recipeListSubject.next(this.allRecipes);
  }

  // Get the recipes with the query of the searchbar
  searchRecipes(searchTerm: string) {
    const returnList: Recipe[] = [];
    const searchTermLowerCase = searchTerm.toLowerCase();

    // Loop trough recipes
    // We use a pre-stored list of recipes, to minimize the queries on the db
    for (let recipe of this.allRecipes) {
      const recipeNameLowerCase: string = recipe.recipeName.toLowerCase();
      // Search names
      if (recipeNameLowerCase.includes(searchTermLowerCase)) {
        returnList.push(recipe);
      } else {
        // No name found, search tags
        for (let tag of recipe.tags) {
          const tagLowerCase = tag.toLowerCase();
          if (tagLowerCase.includes(searchTermLowerCase)) {
            returnList.push(recipe);
            // We don't want a recipe show up multiple times, so break
            break;
          }
        }
      }
    }
    // Notify subscribers
    this.recipeListSubject.next(returnList);
  }

  // Log the user out
  async logOut() {
    try {
      await signOut(this.auth);
      return true;
      // Failed to log out
    } catch (error) {
      console.error(error);
      return false
    }
  }
}



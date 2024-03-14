import {Component, OnInit} from '@angular/core';
import {User} from "../objects/user";
import {FirestoreService} from "../firestore.service";
import {Router} from "@angular/router";
import {Recipe} from "../objects/recipe";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit {
  protected user: User = {
    name: "",
    uid: "-1"
  }
  constructor(private firestoreService: FirestoreService,
              private route: Router) { }
  ngOnInit(): void {
    if(this.firestoreService.getLoggedUser() == null) {
      this.route.navigate(['']);
    } else {
      this.user = this.firestoreService.getLoggedUser()
    }
  }

  async createRecipe(recipeName: string, recipeDescription: string) {
    let recipe: Recipe = {
      recipe: recipeName,
      description: recipeDescription,
      id: Math.floor(Math.random() * 100000),
      uid: this.firestoreService.getLoggedUser().uid
    }
    let successful = await this.firestoreService.addRecipe(recipe);
    if (successful) {
      console.log("Recipe created")
      this.route.navigate(['user', this.firestoreService.getLoggedUser().uid])
    } else {
      console.log("Failed to make recipe")
    }
  }


  logOut() {
    this.firestoreService.logOut().then(r => {
      if (r) {
        this.route.navigate(['']);
      }
    })
  }
}

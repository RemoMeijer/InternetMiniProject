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

  createRecipe(recipeName: string, recipeDescription: string) {
    let recipe: Recipe = {
      recipe: recipeName,
      description: recipeDescription,
      id: Math.floor(Math.random() * 100000),
      uid: this.firestoreService.getLoggedUser().uid
    }
    this.firestoreService.addRecipe(recipe);
  }




}

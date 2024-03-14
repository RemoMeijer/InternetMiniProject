import {Component, OnInit} from '@angular/core';
import {FirestoreService} from "../firestore.service";
import {Recipe} from "../objects/recipe";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-main-body',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './main-body.component.html',
  styleUrl: './main-body.component.css'
})
export class MainBodyComponent implements OnInit  {
  protected recipeList: Recipe[] = [];


  constructor(private firebaseService: FirestoreService,
              private router: Router) {}

  ngOnInit(): void {
    this.getRecipes()
  }

  createRecipe() {
    let recipe: Recipe = {
      recipe: "Appeltaart",
      description: "Goede appeltaart",
      id: Math.floor(Math.random() * 100000),
      uid: this.firebaseService.getLoggedUser().uid
    }
    this.firebaseService.addRecipe(recipe);
  }

  getRandomIntegerBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async getRecipes() {
    this.firebaseService.getAllRecipes()
      .then((recipes) => {
        this.recipeList = recipes
      })
  }

  gotoRecipePage(recipe: Recipe) {
    this.router.navigate(['/recipes', recipe.id]);
  }
}

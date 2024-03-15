import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../objects/recipe";
import {FirestoreService} from "../firestore.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-recipe-detail-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './recipe-detail-page.component.html',
  styleUrl: './recipe-detail-page.component.css'
})
export class RecipeDetailPageComponent implements OnInit {
  recipe: Recipe = {
    id: 0,
    uid: '',
    recipeName: '',
    description: '',
    ingredients: [],
    steps: [],
    tags: []
  };

  private recipeID: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private firestore: FirestoreService) {
  }


  ngOnInit(): void {
    // Get the id given with the route
    this.route.paramMap.subscribe(async params => {
      // Not really a fan of the !, but it's needed
      this.recipeID = +params.get('id')!;
      // Fetch recipe details based on the id (replace with your data fetching logic)
      this.fetchRecipeDetails();
    });
  }

  // Get the recipe based on ID
  async fetchRecipeDetails() {
    // todo just query on ID in firestore, this works ok, but not ideal
    let recipeList = await this.firestore.getAllRecipes()
    for (let recipe of recipeList) {
      if (recipe.id == this.recipeID) {
        // We found the recipe
        this.recipe = recipe;
        return
      }
    }
    // We failed to find the recipe, return to home screen
    this.router.navigate(['/'])
  }

  // Go to user of recipe
  goToUser() {
    this.router.navigate(['./user', this.recipe.uid])
  }
}

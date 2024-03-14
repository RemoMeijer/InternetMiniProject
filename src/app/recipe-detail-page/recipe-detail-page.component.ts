import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../objects/recipe";
import {FirestoreService} from "../firestore.service";

@Component({
  selector: 'app-recipe-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './recipe-detail-page.component.html',
  styleUrl: './recipe-detail-page.component.css'
})
export class RecipeDetailPageComponent implements OnInit {
  protected recipe: Recipe = {
    id: 0,
    description: '',
    uid: '',
    recipe: ''
  };

  private recipeID: number = 0;

    constructor(private route: ActivatedRoute,
                private firestore: FirestoreService) {}


    ngOnInit(): void {
      this.route.paramMap.subscribe(async params => {
        // @ts-ignore
        this.recipeID = +params.get('id');
        // Fetch recipe details based on the id (replace with your data fetching logic)
        this.recipe = await this.fetchRecipeDetails();
      });
    }
    async fetchRecipeDetails() {
      let recipeList = await this.firestore.getAllRecipes()
      for (let recipe of recipeList) {
        if (recipe.id == this.recipeID ) {
          return recipe;
        }
      }
      return this.recipe;


    }

}

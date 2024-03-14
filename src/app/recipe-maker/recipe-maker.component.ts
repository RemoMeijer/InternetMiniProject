import {Component, OnInit} from '@angular/core';
import {FirestoreService} from "../firestore.service";
import {Router} from "@angular/router";
import {Ingredient, Recipe} from "../objects/recipe";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {isEmpty} from "rxjs";

@Component({
  selector: 'app-recipe-maker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './recipe-maker.component.html',
  styleUrl: './recipe-maker.component.css'
})
export class RecipeMakerComponent implements OnInit {
  protected recipe: Recipe = {
    id: NaN,
    uid: '',
    recipeName: '',
    description: '',
    ingredients: [],
    steps: [],
    tags: [],
  }

  protected currentIngredient: Ingredient = {
    ingredient: '',
    amount: NaN,
    unit: '',
  }

  protected step: string = "";
  protected tag: string = "";

  constructor(private fireStoreService: FirestoreService,
              private router: Router) {}


  ngOnInit(): void {
    setTimeout(() => {
      if (this.fireStoreService.getLoggedUser() == null) {
        this.router.navigate(['/login'])
      }
    }, 500)

  }

 submitRecipe(){
    if (this.recipe.steps.length == 0) {
      this.recipe.steps[0] = ""
    }
    if (this.recipe.tags.length == 0) {
      this.recipe.tags[0] = ""
    }
    this.createRecipe(this.recipe)
 }

  async createRecipe(recipe: Recipe) {
    let fullRecipe: Recipe = {
      id: Math.floor(Math.random() * 100000),
      uid: this.fireStoreService.getLoggedUser().uid,
      recipeName: recipe.recipeName,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      tags: recipe.tags,
    }
    let successful: boolean = await this.fireStoreService.addRecipe(fullRecipe);
    if (successful) {
      console.log("Recipe created")
      this.router.navigate(['user', this.fireStoreService.getLoggedUser().uid])
    } else {
      console.log("Failed to make recipe")
    }
  }

  addIngredients() {
    if (this.currentIngredient.ingredient == "") {
      return;
    }
      this.recipe.ingredients.push(this.currentIngredient);

      this.currentIngredient = {
        ingredient: '',
        amount: NaN,
        unit: '',
      };
  }

  addStep() {
    if(this.step != '') {
      this.recipe.steps.push(this.step)
      this.step = '';
    } else {
      console.error("Invalid step")
    }
  }

  addTag() {
    if (this.tag != "") {
      this.recipe.tags.push(this.tag)
      this.tag = ""
    } else {
      console.error("Invalid tag!")
    }
  }
}

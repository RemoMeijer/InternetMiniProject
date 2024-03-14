import {Component, OnInit} from '@angular/core';
import {FirestoreService} from "../firestore.service";
import {Router} from "@angular/router";
import {Recipe} from "../objects/recipe";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-recipe-maker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './recipe-maker.component.html',
  styleUrl: './recipe-maker.component.css'
})
export class RecipeMakerComponent implements OnInit {

  recipeForm: FormGroup = this.fb.group({
    recipe: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(private fireStoreService: FirestoreService,
              private router: Router,
              private fb: FormBuilder) {}


  ngOnInit(): void {
    if (this.fireStoreService.getLoggedUser() == null) {
      this.router.navigate(['/login'])
    }
  }

 submitRecipe(){
    if (this.recipeForm?.valid) {
      const recipe = this.recipeForm.value;
      this.createRecipe(recipe.recipe, recipe.description)
    }
 }

  async createRecipe(recipeName: string, recipeDescription: string) {
    let recipe: Recipe = {
      recipe: recipeName,
      description: recipeDescription,
      id: Math.floor(Math.random() * 100000),
      uid: this.fireStoreService.getLoggedUser().uid
    }
    let successful = await this.fireStoreService.addRecipe(recipe);
    if (successful) {
      console.log("Recipe created")
      this.router.navigate(['user', this.fireStoreService.getLoggedUser().uid])
    } else {
      console.log("Failed to make recipe")
    }
  }

}

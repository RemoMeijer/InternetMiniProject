import { Component } from '@angular/core';
import {FirestoreService} from "../firestore.service";

@Component({
  selector: 'app-main-body',
  standalone: true,
  imports: [],
  templateUrl: './main-body.component.html',
  styleUrl: './main-body.component.css'
})
export class MainBodyComponent {


  constructor(private firebaseService: FirestoreService) {}

  createRecipe() {
    this.firebaseService.addRecipe(this.getRandomIntegerBetween(0, 100), "Appeltaart!");
  }

  getRandomIntegerBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRecipes() {
    this.firebaseService.getAllRecipes();
  }

}

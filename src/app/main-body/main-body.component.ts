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

  async getRecipes() {
    this.firebaseService.getAllRecipes()
      .then((recipes) => {
        this.recipeList = recipes
      })
  }
}

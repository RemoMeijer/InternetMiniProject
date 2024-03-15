import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirestoreService} from "../firestore.service";
import {Recipe} from "../objects/recipe";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {
  castAsAny
} from "@angular/compiler-cli/src/transformers/jit_transforms/initializer_api_transforms/transform_api";

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
export class MainBodyComponent implements OnInit, OnDestroy {

  protected recipeList: Recipe[] = [];
  subscription: any;


  constructor(private firebaseService: FirestoreService,
              private router: Router) {}



  ngOnInit(): void {
     this.subscription = this.firebaseService.recipeList$.subscribe((newRecipes) => {
      this.recipeList = newRecipes;
    })

    this.firebaseService.getAllRecipes()
      .then((recipeList) => {
        this.recipeList = recipeList;
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import {Component, OnInit} from '@angular/core';
import {User} from "../objects/user";
import {FirestoreService} from "../firestore.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Recipe} from "../objects/recipe";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})

export class UserPageComponent implements OnInit {
  protected user: User = {
    name: "",
    uid: "-1"
  }

  userRecipes: Recipe[] = []

  constructor(private firestoreService: FirestoreService,
              private router: Router) {}

  ngOnInit(): void {
    // Go to homepage if we're not logged in
    if (this.firestoreService.getLoggedUser() == null) {
      this.router.navigate(['']);
      return
    }

    // Check if user has name, display that
    if (this.firestoreService.getLoggedUser().displayName != null) {
      this.user.name = this.firestoreService.getLoggedUser().displayName;
    } else {
      // Temporarily assign the uid as name
      this.user.name = this.firestoreService.getLoggedUser().uid;
      this.user.uid = this.firestoreService.getLoggedUser().uid;
    }

    // Get the user's recipes and show on page
    this.getUserRecipes();
  }

  // Get the recipes of the user
  async getUserRecipes() {
    // Get all the recipes
    let allRecipes: Recipe[] = await this.firestoreService.getAllRecipes();
    for (let recipe of allRecipes) {
      // If the recipe is made by the user
      if (recipe.uid == this.firestoreService.getLoggedUser().uid) {
        this.userRecipes.push(recipe)
      }
    }
  }


  // Logs the user out
  logOut() {
    this.firestoreService.logOut().then(success => {
      // If successful, go to homepage
      if (success) {
        this.router.navigate(['']);
      }
    })
  }

  // Goes to the user settings
  goToUserSettings() {
    this.router.navigate(['settings', this.firestoreService.getLoggedUser().uid])
  }
}

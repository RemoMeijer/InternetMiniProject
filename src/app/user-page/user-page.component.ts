import {Component, OnInit} from '@angular/core';
import {User} from "../objects/user";
import {FirestoreService} from "../firestore.service";
import {Router, RouterLink} from "@angular/router";
import {Recipe} from "../objects/recipe";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgOptimizedImage
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
              private route: Router) { }
  ngOnInit(): void {
    if(this.firestoreService.getLoggedUser() == null) {
      this.route.navigate(['']);
      return
    }
    if (this.firestoreService.getLoggedUser().displayName != null) {
      this.user.name = this.firestoreService.getLoggedUser().displayName;
    } else {
      this.user.name = this.firestoreService.getLoggedUser().uid;
      this.user.uid = this.firestoreService.getLoggedUser().uid;
    }

    this.getUserRecipes();

  }

  async getUserRecipes() {
    let allRecipes: Recipe[] = await this.firestoreService.getAllRecipes();
    for (let recipe of allRecipes) {
      if (recipe.uid == this.firestoreService.getLoggedUser().uid) {
        this.userRecipes.push(recipe)
      }
    }
  }


  logOut() {
    this.firestoreService.logOut().then(r => {
      if (r) {
        this.route.navigate(['']);
      }
    })
  }

  goToUserSettings() {
    this.route.navigate(['settings', this.firestoreService.getLoggedUser().uid])
  }
}

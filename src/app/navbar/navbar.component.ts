import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FirestoreService} from "../firestore.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;
  searchTerm: string = "";

  constructor(private router: Router,
              private firestore: FirestoreService) {}

  ngOnInit(): void {
    // Check if user is loggedIn. Notify this.loggedIn this changes
    // If logged in, "login" button will be replaced by "user page" button
    this.firestore.isLoggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    })
  }

  // Go to home page
  goToHome() {
    this.router.navigate(['']);
  }

  // Go to login page
  goToLogin() {
    this.router.navigate(['login']);
  }

  // Go to the users page
  goToUserPage() {
    // Extra check if logged in
    if (this.loggedIn) {
      this.router.navigate(['user', this.firestore.getLoggedUser().uid])
    }
  }

  // Go to make a new recipe
  goToRecipeMaker() {
    // Extra check if logged in
    if (this.loggedIn) {
      this.router.navigate(['newRecipe'])
    } else {
      this.router.navigate(['login'])
    }
  }

  // Search with the search bar
  search() {
    // Display everything when nothing is in the search bar
    if(this.searchTerm == ''){
      this.firestore.returnAll();
      return;
    }

    // Display items which names or tags match with searchTerm
    this.firestore.searchRecipes(this.searchTerm)
  }
}

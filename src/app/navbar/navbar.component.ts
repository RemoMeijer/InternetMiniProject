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
              private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.firestore.isLoggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    })
  }

  goToHome() {
    this.router.navigate(['']);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToUserPage() {
    this.router.navigate(['user', this.firestore.getLoggedUser().uid])
  }

  goToRecipeMaker() {
    this.router.navigate(['newRecipe'])
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.executeSearch()
    }
  }

  private executeSearch() {

  }
}

import { Component } from '@angular/core';
import firebase from "firebase/compat";
import Firestore = firebase.firestore.Firestore;
import {FirestoreService} from "../firestore.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {
  email: string = '';
  password: string = '';
  success: string = '';

  constructor(private firestoreService: FirestoreService) {}

  async makeUser(email: string, password: string) {
    // Make a new user
    const success = await this.firestoreService.newUser(email, password);
    if (success) {
      this.success = "Logged in!"
      // todo route to home
    } else {
      this.success = "Login failed :("
    }
  }

  // Sign in an existing user
  async signIn(email: string, password: string) {
    this.firestoreService.signIn(email, password).then((success) => {
      if (success) {
        this.success = "Logged in!"
      } else {
        this.success = "Login failed :("
      }
    });
  }
}

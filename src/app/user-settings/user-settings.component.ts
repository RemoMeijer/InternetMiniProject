import {Component, OnInit} from '@angular/core';
import {FirestoreService} from "../firestore.service";
import {User} from "../objects/user";
import {Router} from "@angular/router";
import {updateProfile} from "@firebase/auth";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent implements OnInit {
  protected user: User = {
    uid: '',
    name: ''
  }
  protected newName: string ='';

  constructor(private firestoreService: FirestoreService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.firestoreService.getLoggedUser() == null) {
      this.router.navigate(['/login'])
    }
    if(this.firestoreService.getLoggedUser().displayName != null) {
      this.user.name = this.firestoreService.getLoggedUser().displayName;
    }
  }

  updateName() {
    updateProfile(this.firestoreService.getLoggedUser(), {
      displayName: this.newName,  // Use newName from the input field
    }).then(() => {
      console.log("Profile updated!");
      this.user.name = this.firestoreService.getLoggedUser().displayName;
    }).catch((error) => {
      console.error(error);
    });
  }

  logOut() {
    this.firestoreService.logOut().then(r => {
      if (r) {
        this.router.navigate(['']);
      }
    })
  }
}

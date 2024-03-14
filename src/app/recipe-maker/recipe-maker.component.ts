import {Component, OnInit} from '@angular/core';
import {FirestoreService} from "../firestore.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe-maker',
  standalone: true,
  imports: [],
  templateUrl: './recipe-maker.component.html',
  styleUrl: './recipe-maker.component.css'
})
export class RecipeMakerComponent implements OnInit {

    constructor(private fireStoreService: FirestoreService,
                private router: Router) { }

    ngOnInit(): void {
      if (this.fireStoreService.getLoggedUser() == null) {
        this.router.navigate(['/login'])
      }
    }
}

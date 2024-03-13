import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPageComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'internettechnologie';
}

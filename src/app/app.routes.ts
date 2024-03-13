import { Routes } from '@angular/router';
import {MainBodyComponent} from "./main-body/main-body.component";
import {LoginPageComponent} from "./login-page/login-page.component";

export const routes: Routes = [
  {path: '', component: MainBodyComponent},
  {path: 'login', component: LoginPageComponent}
];

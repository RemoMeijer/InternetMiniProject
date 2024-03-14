import { Routes } from '@angular/router';
import {MainBodyComponent} from "./main-body/main-body.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RecipeDetailPageComponent} from "./recipe-detail-page/recipe-detail-page.component";
import {UserPageComponent} from "./user-page/user-page.component";
import {RecipeMakerComponent} from "./recipe-maker/recipe-maker.component";

export const routes: Routes = [
  {path: '', component: MainBodyComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'recipe/:id', component: RecipeDetailPageComponent},
  {path: 'user/:uid', component: UserPageComponent},
  {path: 'newRecipe', component: RecipeMakerComponent}
];

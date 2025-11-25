import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { FrontPageComponent } from './components/front-page/front-page';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'frontPage', component: FrontPageComponent},
    {path: '', redirectTo: 'frontPage', pathMatch: 'full'}
];

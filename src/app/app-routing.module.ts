import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'user-homepage', component: UserHomepageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

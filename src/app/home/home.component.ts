import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  /*********** Constructeur ***********/

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private snackBar: MatSnackBar, 
    private cookieService: CookieService,
    private userService: UserService
  ) {}



  /*********** Variables ***********/

  formToConnect: any = {};  // Données du formulaire de connexion



  /*********** Méthodes ***********/

  // Méthode pour passer à une autre URL
  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  // Méthode pour envoyer le formulaire côté serveur / vérifier le compte pour connecter l'utilisateur
  onSubmit() {
    const userData = {
      email: this.formToConnect.email,
      password: this.formToConnect.password
    };

    this.userService.postLogin(userData).subscribe({
      next: (response: HttpResponse<any>) => {
        const token = response.body.token;
        const username = response.body.username;
        this.cookieService.set('authenticationToken', token, undefined, '/', undefined, true, 'Strict');
        this.navigateTo(`/user-homepage/${username}`);
      },
      error: (error) => {
        if (error.status === 401) {
          this.snackBar.open('E-mail ou mot de passe invalide. Veuillez vérifier vos informations.', 'Fermer', {
            duration: 5000,
            verticalPosition: 'top'
          });
        } else {
          this.snackBar.open('500 Internal Server Error', 'Fermer', {
            duration: 5000,
            verticalPosition: 'top'
          });
        }
      }
    });
  }
}
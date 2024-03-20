import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  /*********** Constructeur ***********/

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private snackBar: MatSnackBar, 
    private cookieService: CookieService,
    private userService: UserService
  ) {}



  /*********** Variables ***********/

  formData: any = {}; // Données du formulaire de création de compte



  /*********** Méthodes ***********/

  // Méthode pour passer à une autre URL
  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  // Méthode pour envoyer le formulaire côté serveur / enregistrer en base le nouvel utilisateur
  onSubmit(form: NgForm) {
    const userData = {
      email: this.formData.email,
      password: this.formData.password,
      firstname: this.formData.firstname,
      name: this.formData.name,
      birthdate: this.formData.birthdate,
      avatar: this.formData.avatar,
      username: this.formData.username
    };
 
    if (form.valid) {
      this.userService.postSignUp(userData).subscribe({
        next: (response) => {
          this.cookieService.set('authenticationToken', response.token, undefined, '/', undefined, true, 'Strict');
          this.navigateTo(`/user-homepage/${response.username}`);
        },
        error: (error) => {
          if (error.status === 400) {
            this.snackBar.open('Le nom d\'utilisateur ou l\'e-mail que vous avez renseigné est déjà utilisé.', 'Fermer', {
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
    else {
      this.snackBar.open('Tous les champs doivent être renseignés pour finaliser l\'inscription.', 'Fermer', {
        duration: 5000,
        verticalPosition: 'top'
      });
    }
    
  }
}
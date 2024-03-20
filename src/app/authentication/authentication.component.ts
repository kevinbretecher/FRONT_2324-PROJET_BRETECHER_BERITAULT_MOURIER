import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  formData: any = {};

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {}

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

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
      this.http.post<any>('http://localhost:3000/signup', userData)
      .subscribe(() => {
        this.navigateTo(`/user-homepage/${this.formData.username}`);
      }, (error: HttpResponse<any>) => {
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

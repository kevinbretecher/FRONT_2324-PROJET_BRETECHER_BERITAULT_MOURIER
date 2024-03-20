import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  formToConnect: any = {};

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {}

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  onSubmit() {
    const userData = {
      email: this.formToConnect.email,
      password: this.formToConnect.password
    };

    this.http.post<any>('http://localhost:3000/login', userData, { observe: 'response' })
      .subscribe((response: HttpResponse<any>) => {
        const responseData = response.body;
        this.navigateTo(`/user-homepage/${responseData.user.username}`);
      }, (error: HttpResponse<any>) => {
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
      });
  }
}

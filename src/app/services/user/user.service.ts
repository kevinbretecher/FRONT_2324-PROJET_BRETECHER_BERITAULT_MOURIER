import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /*********** Constructeur ***********/

  constructor(
    private cookieService: CookieService, 
    private http: HttpClient
  ) {}

  localUrl: string = 'http://localhost:3000/';
  publicUrl : string = 'https://back-2324-projet-bretecher-beritault.onrender.com/'



  /*********** Services ***********/

  // Vérifier que l'utilisateur est bien existant en base
  postLogin(userData: { email: any; password: any; }): Observable<any> {
    return this.http.post<any>( this.publicUrl + 'login', userData, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }

  // Ajout d'un nouvel utilisateur en base
  postSignUp(userData: { email: any; password: any; firstname: any; name: any; birthdate: any; avatar: any; username: any; }): Observable<any> {
    return this.http.post<any>( this.publicUrl + 'signup', userData).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer les informations de l'utilisateur
  getProfile(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getTokenFromCookie()}`);
    return this.http.get<any>( this.publicUrl + 'profile', { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Modifier le profil (l'avatar)
  postProfile(base64Image: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getTokenFromCookie()}`);
    return this.http.post<any>( this.publicUrl + 'profile', { avatar: base64Image }, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }



  /*********** Méthodes ***********/

  // Récupérer le token
  getTokenFromCookie(): string | null {
    if (!this.cookieService.get('authenticationToken')) {
      throw new Error('Token non trouvé.');
    }
    return this.cookieService.get('authenticationToken');
  }

  // Récupérer les erreurs rencontrées lors de l'appel au serveur
  handleError(err: HttpErrorResponse): Observable<never> {
    return throwError( () => err);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEvent } from './event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  /*********** Constructeur ***********/

  constructor(
    private cookieService: CookieService, 
    private http: HttpClient
  ) {}



  /*********** Services ***********/

  // Récupérer tous les events
  getAllEvents(): Observable<IEvent[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getTokenFromCookie()}`);
    return this.http.get<IEvent[]>('http://localhost:3000/events', { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Créer un nouvel event
  postEvent(event: IEvent): Observable<IEvent[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getTokenFromCookie()}`);
    return this.http.post<IEvent[]>('http://localhost:3000/events/new', event, { headers: headers }).pipe(
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

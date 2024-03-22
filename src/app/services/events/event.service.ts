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

  localUrl: string = 'http://localhost:3000/';
  publicUrl : string = 'https://back-2324-projet-bretecher-beritault.onrender.com/'

  /*********** Services ***********/

  // Récupérer tous les events
  getAllEvents(): Observable<IEvent[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getTokenFromCookie()}`);
    return this.http.get<IEvent[]>( this.publicUrl + 'events', { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Créer un nouvel event
  postNewEvent(event: IEvent): Observable<IEvent[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getTokenFromCookie()}`);
    return this.http.post<IEvent[]>( this.publicUrl + 'events/new', event, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Modifier un event
  postModifyEvent(event: IEvent): Observable<IEvent[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getTokenFromCookie()}`);
    return this.http.post<IEvent[]>( this.publicUrl + `events/${event._id}/edit`, event, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  // Récupérer event avec son id
  getEventById(eventId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getTokenFromCookie()}`);
    return this.http.get<any>( this.publicUrl + `events/${eventId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Ajouter en favori un event
  addEventFavorite(eventId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getTokenFromCookie()}`);
    return this.http.get<any>( this.publicUrl + `events/${eventId}/favorite`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer les favoris de l'utilisateur
  getEventFavorite(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getTokenFromCookie()}`);
    return this.http.get<any>( this.publicUrl + 'events/profile', { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Trier et filtrer la liste d'évènement
  getAllEventsFilterSort(filterOption: any, sortOption: any): Observable<IEvent[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getTokenFromCookie()}`);
    return this.http.post<IEvent[]>( this.publicUrl + 'events', { filterOption, sortOption }, { headers }).pipe(
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

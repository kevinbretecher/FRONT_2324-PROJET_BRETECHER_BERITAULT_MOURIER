import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/events/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent {

  /*********** Constructeur ***********/

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}

  

  /*********** Variables ***********/

  username: any;                                                             // Nom d'utilisateur
  eventId!: string;                                                          // Id de l'event
  favorites: any;

  eventInfo: any = {};                                                       // Pour stocker les informations de l'event
  name = '';                                                                 // Nom de l'event
  date = '';                                                                 // Date de l'event
  theme!: 'Sport' | 'Culture' | 'Festif' | 'Pro' | 'Autres';                 // Thème de l'event
  price = '';                                                                // Prix de l'event

  buttonClicked: boolean = false;

  // Tableau contenant les chemins des images correspondant à chaque thème
  themeImages = {
    Sport: 'assets/images/Sport.jpg',
    Culture: 'assets/images/Culture.jpg',
    Festif: 'assets/images/Festif.jpg',
    Pro: 'assets/images/Pro.jpg',
    Autres: 'assets/images/Autres.jpg'
};



  /*********** Méthodes ***********/

  // Méthode pour passer à une autre URL
  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  // Permet de récupérer les informations du profil au chargement du composant
  // Permet de récupérer le nom d'utilisateur présent dans l'URL
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.eventId = params['event.id'];
      this.getEventDetails(this.eventId);
    });
  }

  // Méthode pour récupérer les informations du profil depuis le serveur
  getEventDetails(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe({
      next: (response) => {
        this.favorites = response.favoritedUsers.map((event: { username: any; }) => event.username);
        this.eventInfo = response;
        this.name = response.name;
        this.date = response.date;
        this.theme = response.theme;
        this.price = response.price;
      },
      error: () => {
        this.snackBar.open('Un problème est survenu lors du chargement de votre profil.', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    });
  }

  // Méthode pour ajouter un évènement à ses favoris
  addEventInFavorite(eventId: string): void {
    this.buttonClicked = true;

    this.eventService.addEventFavorite(eventId).subscribe({
      next: (response) => {
        this.eventInfo = response;
        this.snackBar.open('L\'événement a été ajouté à vos favoris !', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top'
        });
      },
      error: () => {
        this.snackBar.open('Un problème est survenu lors de l\'ajout en favori.', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    })
  }
}

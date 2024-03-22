import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user/user.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../services/events/event.service';
import { IEvent } from '../services/events/event.interface';

export enum Theme {
  Sport = 'Sport',
  Culture = 'Culture',
  Festif = 'Festif',
  Pro = 'Pro',
  Autres = 'Autres'
}

export type ThemeImages = {
  [key in Theme]: string;
} & { [key: string]: string };

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  /*********** Constructeur ***********/

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private eventService: EventService
  ) {}

  @ViewChild('fileInput') fileInput!: ElementRef;



  /*********** Variables ***********/

  userInfo: any = {};         // Pour stocker les informations du profil
  img : any = { image : "" }  // Image pour l'avatar
  username: any;              // Nom d'utilisateur

  events: IEvent[] = [];      // Liste d'event
  favorites: any;             // Event en favoris
  eventCreated : any;         // Event créés par l'utilisateur

  // Tableau contenant les chemins des images correspondant à chaque thème
  themeImages: ThemeImages = {
    [Theme.Sport]: 'assets/images/Sport.jpg',
    [Theme.Culture]: 'assets/images/Culture.jpg',
    [Theme.Festif]: 'assets/images/Festif.jpg',
    [Theme.Pro]: 'assets/images/Pro.jpg',
    [Theme.Autres]: 'assets/images/Autres.jpg'
  };
  
  

  /*********** Méthodes ***********/

  // Méthode pour passer à une autre URL
  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  // Méthodes initialisées au démarrage de la page
  ngOnInit() {
    this.fetchProfile();
    this.getUsernameFromURL();
    this.getAllEvents();
    this.getAllEventsAddedInFavorite();
  }

  // Méthode pour récupérer tous les évènements que l'utilisateur a ajouté en favori
  getAllEventsAddedInFavorite(): void {
    this.eventService.getEventFavorite().subscribe(favorites => {
      this.favorites = favorites;
      this.eventCreated = favorites.filter((event: { owner: any; }) => event.owner === this.userInfo._id);
    });
  }
  
  // Méthode pour récupérer tous les évènements
  getAllEvents(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
    });
  }

  // Méthode pour récupérer le nom d'utilisateur présent dans l'URL
  getUsernameFromURL(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  // Méthode pour récupérer les informations du profil depuis le serveur
  fetchProfile(): void {
    this.userService.getProfile().subscribe({
      next: (response) => {
        this.userInfo = response;
        this.img.image = 'http://localhost:3000' + this.userInfo.avatar;
      },
      error: () => {
        this.snackBar.open('Un problème est survenu lors du chargement de votre profil', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    });
  }

  // Méthode pour afficher / cacher events en favoris
  isEventFavoriVisible: boolean = false;
  displayEventsFavorite(): void {
    this.isEventFavoriVisible = !this.isEventFavoriVisible;
  }

  // Méthode pour afficher / cacher events créés par le user
  isEventCreatedVisible: boolean = false;
  displayEventsCreated(): void {
    this.isEventCreatedVisible = !this.isEventCreatedVisible;
  }

  // Méthode pour accéder à l'explorateur de fichier et sélectionner un nouvel avatar
  openFilePicker(): void {
    this.fileInput.nativeElement.click();
  }

  // Méthode pour changer l'image en fonction de ce qu'a choisi l'utilisateur
  changeImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.img.image = e.target.result;
      this.uploadAvatar(e.target.result);
    };

    reader.readAsDataURL(file);
  }

  // Méthode pour mettre à jour l'avatar en base
  uploadAvatar(base64Image: string): void {
    this.userService.postProfile(base64Image).subscribe({
      next: (response) => {
        this.userInfo.avatar = response.newAvatarUrl;
      },
      error: () => {
        this.snackBar.open('Un problème est survenu lors de la modification de votre avatar', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    });
  }
}
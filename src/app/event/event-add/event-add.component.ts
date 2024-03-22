import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from 'src/app/services/events/event.interface';
import { EventService } from 'src/app/services/events/event.service';


@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent {

  /*********** Constructeur ***********/

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}
  
  @ViewChild('fileInput') fileInput!: ElementRef;



  /*********** Variables ***********/

  showAddView: boolean = false;                                                   // Vue ajout event
  showEditView: boolean = false;                                                  // Vue édition event
  
  eventName = '';                                                                 // Nom de l'event
  selectedDate = '';                                                              // Date sélectionnée
  theme!: 'Sport' | 'Culture' | 'Festif' | 'Pro' | 'Autres';                      // Thème
  prix = '';                                                                      // Prix

  username: any;                                                                  // Nom d'utilisateur
  eventId!: string;                                                               // Id de l'event
  eventInfo: any = {};                                                            // Pour stocker les informations de l'event

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

  // Permet d'afficher la page d'ajout ou d'édition d'event en fonction de l'URL
  // Permet de récupérer le username et l'id de l'event situés dans l'URL
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.eventId = params['eventId'];
    });

    this.route.url.subscribe(url => {
      if (url[2].path === 'event-add') {
        this.showAddView = true;
      } else if (url[2].path === 'event-edit') {
        this.showEditView = true;
        this.getEventDetails(this.eventId);
      }
    });
  }

  // Méthode pour récupérer les informations du profil depuis le serveur
  getEventDetails(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe({
      next: (response) => {
        this.eventInfo = response;
        this.eventName = response.name;
        this.selectedDate = response.date;
        this.theme = response.theme;
        this.prix = response.price;
      },
      error: () => {
        this.snackBar.open('Un problème est survenu lors de la récupération des informations de l\'évènement.', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    });
  }

  // Permet d'enregistrer un nouvel event en base
  submitFormAdd(): void {
    const event = {
      name: this.eventName,
      date: new Date(this.selectedDate).toISOString().split('T')[0],
      theme: this.theme,
      price: parseFloat(this.prix),
      _id: 0,
      location: '',
      owner: '',
      image: ''
    };

    this.eventService.postNewEvent(event).subscribe({
      next: () => {
        this.navigateTo(`/user-homepage/${this.username}`);
      },
      error: () => {
        this.snackBar.open('Un problème est survenu lors de la création d\'un nouvel évènement.', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    });
  }

  // Permet de modifier un event déjà existant
  submitFormEdit(): void {
    const event = {
      name: this.eventName,
      date: new Date(this.selectedDate).toISOString().split('T')[0],
      theme: this.theme,
      price: parseFloat(this.prix),
      _id: this.eventInfo._id,
      location: '',
      owner: '',
      image: ''
    };
    this.eventService.postModifyEvent(event).subscribe(
      () => {
        this.navigateTo(`/user-homepage/${this.username}`);
      },
      (error) => {
        console.log(error);
        if (error.status === 403) {
          this.snackBar.open('Vous n\avez pas les droits pour modifier cet évènement.', 'Fermer', {
            duration: 5000,
            verticalPosition: 'top'
          });
        }
        console.error('Erreur lors de l\'envoi des données:', error);
      }
    );
  }
}
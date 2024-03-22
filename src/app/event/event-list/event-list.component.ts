import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/events/event.service';
import { IEvent } from 'src/app/services/events/event.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  sortDirection!: string;

  /*********** Constructeur ***********/

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {
    this.currentUrl = this.router.url;
  }



  /*********** Variables ***********/

  eventName = '';         // Nom de l'event
  max = '';               // Prix max de l'event
  min = '';               // Prix min de l'event
  currentUrl: string;     // URL de la page
  username: any;          // Nom d'utilisateur
  events: IEvent[] = [];  // Liste d'event

  name = '';                                                              // Nom de l'event
  date = '';                                                              // Date sélectionnée
  theme!: 'Sport' | 'Culture' | 'Festif' | 'Pro' | 'Autres';              // Thème
  price = '';                                                             // Prix

  filteredEvents: IEvent[] = [];                                          // Liste d'événements filtrés

  // Tableau contenant les chemins des images correspondant à chaque thème
  themeImages: ThemeImages = {
    [Theme.Sport]: 'assets/images/Sport.jpg',
    [Theme.Culture]: 'assets/images/Culture.jpg',
    [Theme.Festif]: 'assets/images/Festif.jpg',
    [Theme.Pro]: 'assets/images/Pro.jpg',
    [Theme.Autres]: 'assets/images/Autres.jpg'
  };

  nameCondition: any;
  minPriceCondition: any;
  maxPriceCondition: any;
  themeCondition: any;



  /*********** Méthodes ***********/
  
  // Méthode pour passer à une autre URL
  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
  
  // Permet de récupérer le nom d'utilisateur présent dans l'URL
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });

    this.eventService.getAllEvents().subscribe(events => {
      this.filteredEvents = events;
    });

  }

  // Méthode pour filtrer les événements en fonction des critères
  filterEvents() {
    this.filteredEvents = this.events.filter(event => {
      this.nameCondition = this.eventName;
      this.minPriceCondition = this.min;
      this.maxPriceCondition = this.max;
      this.themeCondition = this.theme;
    });

    const filterOptions = {
      name: this.eventName,
      minPrice: this.min,
      maxPrice: this.max,
      theme: this.theme
    };

    const sortOptions = {
      price: 1,
      date: -1
    };

    this.eventService.getAllEventsFilterSort(filterOptions, sortOptions).subscribe({
      next: (events) => {
        this.filteredEvents = events;
      },
      error: () => {
        this.snackBar.open('Un problème est survenu.', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    })
  }

  // Méthode pour trier les événements par prix ou par date
  sortEvents(sortBy: string) {
    // Si le tri actuel est croissant, basculer vers le tri décroissant et vice versa
    switch (sortBy) {
      case 'price':
        this.filteredEvents.sort((a, b) => {
          return this.sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
        });
        break;
      case 'date':
        this.filteredEvents.sort((a, b) => {
          return this.sortDirection === 'asc' ? new Date(a.date).getTime() - new Date(b.date).getTime() :
            new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        break;
      default:
        break;
    }

    // Inverser la direction du tri pour la prochaine fois
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }
}
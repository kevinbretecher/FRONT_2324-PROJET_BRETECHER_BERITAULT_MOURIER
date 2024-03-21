import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/events/event.service';
import { IEvent } from 'src/app/services/events/event.interface';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  /*********** Constructeur ***********/

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.currentUrl = this.router.url;
  }



  /*********** Variables ***********/

  eventName = '';         // Nom de l'event
  max = '';               // Prix max de l'event
  min = '';               // Prix min de l'event
  currentUrl: string;     // URL de la page
  username: any;          // Nom d'utilisateur
  events: IEvent[] = [];   // Liste d'event

  // Image utilisée dans l'affichage des events
  logo : any = {
    imageWidth : 130,
    imageTitle : "Image",
    image : "assets/images/logo.svg"
  };



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
      this.events = events;
    });
  }
}
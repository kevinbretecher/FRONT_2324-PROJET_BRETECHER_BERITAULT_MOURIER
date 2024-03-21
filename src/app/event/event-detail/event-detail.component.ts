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

  eventInfo: any = {};        // Pour stocker les informations de l'event
  img : any = { image : "" }  // Image pour l'avatar
  username: any;              // Nom d'utilisateur
  eventId!: string;
  


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
        this.eventInfo = response;
      },
      error: () => {
        this.snackBar.open('Un problème est survenu lors du chargement de votre profil', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    });
  }
}

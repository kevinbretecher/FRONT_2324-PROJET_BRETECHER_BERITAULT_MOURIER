import { Component, ElementRef, ViewChild } from '@angular/core';
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
    private eventService: EventService
  ) {}
  
  @ViewChild('fileInput') fileInput!: ElementRef;



  /*********** Variables ***********/

  showAddView: boolean = false;       // Vue ajout event
  showEditView: boolean = false;      // Vue édition event
  
  eventName = '';                     // Nom de l'event
  eventName2 = 'Football';
  min = '';                           // Prix minimum
  selectedDate = '';                  // Date sélectionnée
  selectedDate2 : Date = new Date();
  theme = 'Sport';                    // Thème
  prix = '';                          // Prix

  username: any;                      // Nom d'utilisateur

  events: IEvent[] = [];              // Liste d'event
  eventCreated!: IEvent;

  // Image pour l'event
  img : any = {
    image : "",
    image2 : "../../assets/images/foot.jpg"
  }



  /*********** Méthodes ***********/
  
  // Méthode pour passer à une autre URL
  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  // Méthode pour accéder à l'explorateur de fichier et sélectionner un nouvel avatar
  openFilePicker(): void {
    this.fileInput.nativeElement.click();
  }

  // Méthode pour changer l'image
  changeImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.img.image = e.target.result;
    };
    
    reader.readAsDataURL(file);
  }

  // Permet d'afficher la page d'ajout ou d'édition d'event en fonction de l'URL
  ngOnInit(): void {
    this.route.url.subscribe(url => {
      if (url[2].path === 'event-add') {
        this.showAddView = true;
      } else if (url[2].path === 'event-edit') {
        this.showEditView = true;
      }
    });

    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  submitForm(): void {
    const event = {
      name: this.eventName,
      date: new Date(this.selectedDate).toISOString().split('T')[0],
      theme: this.theme,
      price: parseFloat(this.prix),
      id: 0,
      location: '',
      owner: '',
      image: ''
    };
      console.log(this.selectedDate);
     console.log(event.date);
    this.eventService.postEvent(event).subscribe(
      () => {
        this.navigateTo(`/user-homepage/${this.username}`);
      },
      (error) => {
        console.error('Erreur lors de l\'envoi des données:', error);
      }
    );
  }
}
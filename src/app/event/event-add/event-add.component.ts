import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent {

  /*********** Constructeur ***********/

  constructor(private route: ActivatedRoute) {}
  
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
  prix = '2';                         // Prix

  // Image pour l'event
  img : any = {
    image : "",
    image2 : "../../assets/images/foot.jpg"
  }



  /*********** Méthodes ***********/
  
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
  }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {
  eventName = '';
  max = '';
  min = '';

  // Caractéristiques du logo
  logo : any = {
    imageWidth : 130,
    imageTitle : "Image",
    image : "assets/images/logo.svg"
  };
}

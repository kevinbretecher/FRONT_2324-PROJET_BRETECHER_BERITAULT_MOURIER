import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {
  eventName = '';
  max = '';
  min = '';
  currentUrl: string;
  username: any;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.currentUrl = this.router.url;
  }
  
  // Caractéristiques du logo
  logo : any = {
    imageWidth : 130,
    imageTitle : "Image",
    image : "assets/images/logo.svg"
  };

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }
}

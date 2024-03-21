import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent {

  /*********** Constructeur ***********/

  constructor(private route: ActivatedRoute) {}



  /*********** Variables ***********/

  username: any;    // Nom d'utilisateur



  /*********** Méthodes ***********/
  
  // Permet de récupérer le nom d'utilisateur présent dans l'URL
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }
}
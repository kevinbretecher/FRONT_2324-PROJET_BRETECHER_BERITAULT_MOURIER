import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  /*********** Constructeur ***********/

  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) {
    this.currentUrl = this.router.url;
  }



  /*********** Variables ***********/

  currentUrl: string;     // URL de la page
  username: any;          // Nom d'utilisateur

  // Caractéristiques du logo
  logo : any = {
    imageWidth : 130,
    imageTitle : "Image",
    image : "assets/images/logo.svg"
  };



  /*********** Méthodes ***********/

  // Permet de récupérer le nom d'utilisateur présent dans l'URL
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  // Vérifie si l'url de la page correspond à la page de connexion, d'authent ou pas car le header n'est pas le même
  AuthentOrConnectionPage(currentUrl: string): boolean{
    if (currentUrl === '/home' || currentUrl === '/authentication') {
      return true;
    }
    return false;
  }

  // Méthode pour passer à une autre URL
  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
}

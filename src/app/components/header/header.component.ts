import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // Variables
  currentUrl: string;

  // Constructeur
  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }

  // Vérifie si l'url de la page correspond à la page de connexion, d'authent ou pas car le header n'est pas le même
  AuthentOrConnectionPage(currentUrl: string): boolean{
    if (currentUrl === '/home' || currentUrl === '/authentication') {
      return true;
    }
    return false;
  }

  // Caractéristiques du logo
  logo : any = {
    imageWidth : 130,
    imageTitle : "Image",
    image : "assets/images/logo.svg"
  };

  onMenuItemClick(option: string) {
    console.log('Option sélectionnée :', option);
    // Ajoutez ici la logique pour gérer le clic sur une option de menu
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
}

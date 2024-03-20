import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  /*********** Constructeur ***********/

  constructor(
    private http: HttpClient, 
    private cookieService: CookieService
  ) {}

  @ViewChild('fileInput') fileInput!: ElementRef;



  /*********** Variables ***********/

  userInfo: any = {}; // Pour stocker les informations du profil
  img : any = { image : "" }  // Image pour l'avatar

  // Image utilisée dans l'affichage des events
  logo : any = {
    imageWidth : 130,
    imageTitle : "Image",
    image : "assets/images/logo.svg"
  };
  
  

  /*********** Méthodes ***********/

  // Permet de récupérer les informations du profil au chargement du composant
  ngOnInit() {
    this.fetchProfile();
  }

  // Méthode pour récupérer les informations du profil depuis le serveur
  fetchProfile(): void {
    const token = this.cookieService.get('authenticationToken');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
      this.http.get<any>('http://localhost:3000/profile', { headers: headers })
        .subscribe(
          response => {
            this.userInfo = response;
            this.img.image = 'http://localhost:3000'+this.userInfo.avatar;
          },
          error => {
            console.error('Erreur lors de la récupération du profil :', error);
          }
        );
        } else{
          console.error('Token non trouvé dans le cookie.');
        }
  }

  // Méthode pour afficher / cacher events
  isVisible: boolean = false;
  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  // Méthode pour accéder à l'explorateur de fichier et sélectionner un nouvel avatar
  openFilePicker(): void {
    this.fileInput.nativeElement.click();
  }

  // Méthode pour changer l'image en fonction de ce qu'a choisi l'utilisateur
  changeImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.img.image = e.target.result;
      this.uploadAvatar(e.target.result);
    };

    reader.readAsDataURL(file);
  }

  // Méthode pour mettre à jour l'avatar en base
  uploadAvatar(base64Image: string): void {
    const token = this.cookieService.get('authenticationToken');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.post<any>('http://localhost:3000/profile', { avatar: base64Image }, { headers: headers })
        .subscribe(
          response => {
            this.userInfo.avatar = response.newAvatarUrl;
          },
          error => {
            console.error('Erreur lors de l\'envoi de l\'avatar :', error);
          }
        );
    } else {
      console.error('Token non trouvé dans le cookie.');
    }
  }
}

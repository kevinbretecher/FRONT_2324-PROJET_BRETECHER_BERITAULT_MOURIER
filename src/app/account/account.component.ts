import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user/user.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  /*********** Constructeur ***********/

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  @ViewChild('fileInput') fileInput!: ElementRef;



  /*********** Variables ***********/

  userInfo: any = {};         // Pour stocker les informations du profil
  img : any = { image : "" }  // Image pour l'avatar
  username: any;              // Nom d'utilisateur

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

  // Permet de récupérer les informations du profil au chargement du composant
  // Permet de récupérer le nom d'utilisateur présent dans l'URL
  ngOnInit() {
    this.fetchProfile();
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  // Méthode pour récupérer les informations du profil depuis le serveur
  fetchProfile(): void {
    this.userService.getProfile().subscribe({
      next: (response) => {
        this.userInfo = response;
        this.img.image = 'http://localhost:3000' + this.userInfo.avatar;
      },
      error: () => {
        this.snackBar.open('Un problème est survenu lors du chargement de votre profil', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    });
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
    this.userService.postProfile(base64Image).subscribe({
      next: (response) => {
        this.userInfo.avatar = response.newAvatarUrl;
      },
      error: () => {
        this.snackBar.open('Un problème est survenu lors de la modification de votre avatar', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    });
  }
}
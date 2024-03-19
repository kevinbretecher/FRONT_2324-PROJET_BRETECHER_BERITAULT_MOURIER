import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
    // Caractéristiques du logo
    logo : any = {
      imageWidth : 130,
      imageTitle : "Image",
      image : "assets/images/logo.svg"
    };

    img : any = {
      image : "../../assets/images/user_kids_avatar_user_profile_icon_149314.svg"
    }
  isVisible: boolean = false;
  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

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
}

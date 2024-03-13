import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  logo : any = {
    imageWidth : 130,
    imageTitle : "Image",
    image : "assets/images/logo.svg"
  };
}

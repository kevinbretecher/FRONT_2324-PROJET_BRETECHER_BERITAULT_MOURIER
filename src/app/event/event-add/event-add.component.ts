import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent {
  img : any = {
    image : "",
    image2 : "../../assets/images/foot.jpg"
  }
  eventName= '';
  min = '';
  selectedDate = '';

  eventName2= 'Football';
  prix = '2';
  theme = 'Sport';
  selectedDate2 : Date = new Date();


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

  showAddView: boolean = false;
  showEditView: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      if (url[0].path === 'event-add') {
        this.showAddView = true;
      } else if (url[0].path === 'event-edit') {
        this.showEditView = true;
      }
    });
  }
}

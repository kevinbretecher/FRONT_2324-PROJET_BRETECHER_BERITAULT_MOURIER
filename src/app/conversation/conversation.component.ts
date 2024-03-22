import { Component, OnInit } from '@angular/core';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit{

    /*********** Variables ***********/
    users: any[] = [];
    username : any;
    //userPairs: any[][] = [];              //pour faire 2 colonnes 


  /*********** Constructeur ***********/
  constructor(private conversation: ConversationService, 
              private route: ActivatedRoute,
              private router: Router) { }


  /*********** Méthodes ***********/
  ngOnInit(): void {
    this.conversation.getUsers().subscribe(users => {
      this.users = users.filter((user: any) => user.username !== this.username);
      //this.userPairs = this.chunkArray(this.users, 2);        //pour faire 2 colonnes 
    });
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  } 

  //  pour faire 2 colonnes 
  /*chunkArray(array: any[], size: number): any[][] {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }*/

  goToChatPage(user:any): void {
    this.conversation.setSelectedUser(user);
    this.conversation.sendUserIdToServer(user._id);
    this.router.navigate(['/user-homepage', this.username, 'chat']);
  }
}

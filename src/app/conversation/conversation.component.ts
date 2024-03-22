import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit{

    /*********** Variables ***********/
    users: any[] = [];
    username : any;
    private usersSubscription : Subscription = new Subscription();

  /*********** Constructeur ***********/
  constructor(private conversation: ConversationService, 
              private route: ActivatedRoute,
              private router: Router) { }


  /*********** Méthodes ***********/
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.fetchUsers();
    });
  } 

  fetchUsers(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
    this.usersSubscription = this.conversation.getUsers().subscribe(users => {
      this.users = users.filter((user: any) => user.username !== this.username);
    });
  }

  goToChatPage(user:any): void {
    this.conversation.setSelectedUser(user);
    this.conversation.sendUserIdToServer(user._id);
    this.router.navigate(['/user-homepage', this.username, 'chat']);
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}

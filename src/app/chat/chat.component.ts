import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  /*********** Variables ***********/
  messages: any[] = []; 
  newMessage: string = '';
  username: string = '';
  selectedUser: any;
  //receivedMessages: any[] = [];
  messageSubscription: Subscription = new Subscription();

  
  /*********** Constructeur ***********/
  constructor(private conversation: ConversationService, 
              private route: ActivatedRoute) {}

  /*********** Méthodes ***********/
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.selectedUser = this.conversation.getSelectedUser();
      if (this.selectedUser) {
        this.conversation.fetchMessagesFromServer(this.selectedUser._id);
        this.messageSubscription = this.conversation.listenForMessages().subscribe((message : any) => {
          this.messages.push(message);
          //this.conversation.fetchMessagesFromServer(message.senderId);
        });
      }
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      const currentTime = new Date();
      const fullMessage = {
        sender: this.username, 
        timestamp: currentTime,
        content: this.newMessage
      };
      this.messages.push(fullMessage);
      this.newMessage = '';
      this.conversation.sendMessageToServer(this.selectedUser._id, fullMessage.content);
      //this.conversation.sendMessageToServer(fullMessage);
    }
  }

  ngOnDestroy(): void {
    console.log("Destroy Chat");
    this.messageSubscription.unsubscribe();
  }
}

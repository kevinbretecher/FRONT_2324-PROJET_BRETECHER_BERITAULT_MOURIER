import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  /*********** Variables ***********/
  messages: any[] = []; // Stocker les messages
  newMessage: string = ''; // Nouveau message saisi par l'utilisateur
  username: string = ''; //Nom d'utilisateur 
  
  /*********** Constructeur ***********/
  constructor(private route: ActivatedRoute) {}

  /*********** Méthodes ***********/
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const currentTime = new Date();
      const fullMessage = {
        sender: this.username, // Utilisation de votre nom d'utilisateur
        timestamp: currentTime,
        content: this.newMessage
      };
      this.messages.push(fullMessage); // Ajouter le message à la liste des messages
      this.newMessage = ''; // Réinitialiser la zone de saisie du message
    }
  }
}

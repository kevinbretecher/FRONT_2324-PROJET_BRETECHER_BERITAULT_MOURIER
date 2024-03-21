import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: any[] = []; // Stocker les messages
  newMessage: string = ''; // Nouveau message saisi par l'utilisateur

  // Fonction pour envoyer un message
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const currentTime = new Date();
      const fullMessage = {
        sender: 'Francis', // Mettez le nom de l'utilisateur actuel ici
        timestamp: currentTime,
        content: this.newMessage
      };
      this.messages.push(fullMessage); // Ajouter le message à la liste des messages
      this.newMessage = ''; // Réinitialiser la zone de saisie du message
    }
  }
}

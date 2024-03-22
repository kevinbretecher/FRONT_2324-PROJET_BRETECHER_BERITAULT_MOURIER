import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  /*********** Variables ***********/
  messages: any[] = [];
  newMessage: string = '';
  username: string = '';
  selectedUser: any;
  messageSubscription: Subscription = new Subscription();
  fetchingMessages: boolean = false;

  /*********** Constructeur ***********/
  constructor(private conversation: ConversationService,
              private route: ActivatedRoute) {}

  /*********** Méthodes ***********/
  ngOnInit(): void {
    // Souscrit aux paramètres de l'URL pour récupérer le nom d'utilisateur
    this.route.params.subscribe(params => {
      // Récupération du nom d'utilisateur depuis l'URL
      this.username = params['username'];
      this.selectedUser = this.conversation.getSelectedUser();
      if (this.selectedUser) {
        // Envoie l'ID de l'utilisateur sélectionné pour récupérer l'historique des messages
        this.conversation.envoieUserId(this.selectedUser._id);
        // Souscrit aux messages pour l'historique
        this.messageSubscription = this.conversation.listenForMessages().subscribe((messages: any[]) => {
          // Formatage des messages avec un timestamp et un indicateur de réception ou d'envoi
          this.messages = messages.map(message => ({
            ...message,
            timestamp: new Date(message.date),
            received: message.receiver !== this.username // Indique si le message a été reçu ou envoyé par l'utilisateur actuel
          }));
        });
        // Souscrit aux messages en temps réel
        this.messageSubscription.add(this.conversation.listenForMessages(true).subscribe((message: any) => {
          // Formatage du message avec un timestamp
          message.timestamp = new Date(message.date);
          // Ajoute le message à la liste des messages
          this.messages.push(message);
        }));
      }
    });
  }

  // Envoie d'un message
  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      const currentTime = new Date();
      const fullMessage = {
        sender: this.username,
        timestamp: currentTime,
        content: this.newMessage
      };
      // Ajoute le message à la liste des messages affichés
      this.messages.push(fullMessage);
      // Réinitialise le champ de saisie du message
      this.newMessage = '';
      // Envoie le message au serveur via le service ConversationService
      this.conversation.sendMessageToServer(this.selectedUser._id, fullMessage.content);
    }
  }

  // Désabonne l'abonnement aux messages lors de la destruction du composant pour éviter les fuites de mémoire
  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }
}

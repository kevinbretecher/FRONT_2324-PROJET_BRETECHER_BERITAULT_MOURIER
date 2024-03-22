import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private socket: Socket;
  selectedUser: any;

  constructor(private cookieService: CookieService) {
    // Récupère le token d'authentification depuis les cookies
    const token = this.getTokenFromCookie();
    
    // Initialise la connexion socket avec le serveur
    this.socket = io('http://localhost:3000', {
      auth: {
        token: token
      }
    });
  }

  // Sélectionne un utilisateur
  setSelectedUser(user: any) {
    this.selectedUser = user;
  }

  // Récupère l'utilisateur sélectionné
  getSelectedUser() {
    return this.selectedUser;
  }

  // Récupère la liste des utilisateurs depuis le serveur
  getUsers(): Observable<any> {
    // Émet un événement pour demander tous les utilisateurs
    this.socket.emit('allUsers');
    
    // Retourne un Observable qui écoute sur l'événement 'allUsers'
    return new Observable(observer => {
      this.socket.on('allUsers', (users) => {
        observer.next(users);
      });
    });
  }

  // Récupère le token d'authentification depuis les cookies
  getTokenFromCookie(): string | null {
    if (!this.cookieService.get('authenticationToken')) {
      throw new Error('Token non trouvé.');
    }
    return this.cookieService.get('authenticationToken');
  }

  // Envoie un message au serveur
  sendMessageToServer(userId: string, message: string): void {
    // Vérifie que l'ID utilisateur et le message sont valides, puis émet un événement 'message' au serveur
    if (userId && message) {
      this.socket.emit('message', { receiver: userId, content: message });
    } else {
      console.error('ID utilisateur ou message non valide.');
    }
  }

  // Écoute les messages du serveur
  // Si isSingleMessage est true, écoute un seul message, sinon, écoute tous les messages
  listenForMessages(isSingleMessage: boolean = false): Observable<any | any[]> {
    return new Observable(observer => {
      if (isSingleMessage) {
        // Écoute un seul message et le renvoie à l'observateur
        this.socket.on('message', (message) => {
          observer.next(message);
        });
      } else {
        // Écoute tous les messages et les renvoie à l'observateur
        this.socket.on('messages', (messages: any[]) => {
          // Ajoute une propriété 'sent' à chaque message pour indiquer s'il a été envoyé par l'utilisateur connecté
          const messagesWithSentProperty = messages.map(message => ({
            ...message,
            sent: message.sender === this.getSelectedUser()._id
          }));
          observer.next(messagesWithSentProperty);
        });
      }
    });
  }
  
  // Envoie l'ID de l'utilisateur au serveur pour récupérer les messages
  envoieUserId(userId: string): void {
    if (userId) {
      this.socket.emit('fetchMessages', { id: userId });
    } else {
      console.error('ID utilisateur non valide.');
    }
  }
}

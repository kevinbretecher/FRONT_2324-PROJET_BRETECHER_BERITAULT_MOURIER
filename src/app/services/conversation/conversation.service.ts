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

  constructor( private cookieService : CookieService) {
    const token = this.getTokenFromCookie();
    this.socket = io('http://localhost:3000', {
      auth: {
        token: token
      }
    });
  }

  setSelectedUser(user: any) {
    this.selectedUser = user;
  }

  getSelectedUser() {
    return this.selectedUser;
  }

  getUsers(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('allUsers', (users) => {
        observer.next(users);
      });
    });
  }

  getTokenFromCookie(): string | null {
    if (!this.cookieService.get('authenticationToken')) {
      throw new Error('Token non trouvé.');
    }
    return this.cookieService.get('authenticationToken');
  }

  sendUserIdToServer(userId: string): void {
    if (!userId) {
      console.error('User ID not provided.');
      return;
    }
  
    this.socket.emit('userClicked', userId);
  }
  
  
  sendMessageToServer(userId: string, message: string): void {
    if (userId && message) {
      this.socket.emit('message', { receiver: userId, content: message });
    } else {
      console.error('ID utilisateur ou message non valide.');
    }
  }
 

  listenForMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  }


  fetchMessagesFromServer(userId: string): void {
    if (userId) {
      this.socket.emit('fetchMessages', { id: userId });
    } else {
      console.error('ID utilisateur non valide.');
    }
  }
}

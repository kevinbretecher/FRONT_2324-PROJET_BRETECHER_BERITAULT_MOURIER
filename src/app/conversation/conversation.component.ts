import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, OnDestroy {
  /*********** Variables ***********/
  users: any[] = [];
  username: any;
  private usersSubscription: Subscription = new Subscription();

  /*********** Constructeur ***********/
  constructor(
    private conversation: ConversationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /*********** Méthodes ***********/
  ngOnInit(): void {
    // Récupère le nom d'utilisateur depuis les paramètres de l'URL et charge la liste des utilisateurs
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.fetchUsers();
    });
  }

  // Récupère la liste des utilisateurs depuis le service ConversationService
  fetchUsers(): void {
    // Se désabonne de l'observable précédent si présent
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
    // Souscrit à l'observable getUsers() du service ConversationService pour obtenir la liste des utilisateurs
    this.usersSubscription = this.conversation.getUsers().subscribe(users => {
      // Filtrer les utilisateurs pour ne pas inclure l'utilisateur actuel
      this.users = users.filter((user: any) => user.username !== this.username);
    });
  }

  // Navigue vers la page de chat avec l'utilisateur sélectionné
  goToChatPage(user: any): void {
    // Sélectionne l'utilisateur et envoie son ID au service ConversationService
    this.conversation.setSelectedUser(user);
    this.conversation.envoieUserId(user._id);
    // Navigue vers la page de chat avec le nom d'utilisateur actuel et l'utilisateur sélectionné
    this.router.navigate(['/user-homepage', this.username, 'chat']);
  }

  // Se désabonne de l'observable lors de la destruction du composant pour éviter les fuites de mémoire
  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}

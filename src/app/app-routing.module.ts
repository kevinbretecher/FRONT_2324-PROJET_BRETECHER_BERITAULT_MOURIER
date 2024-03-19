import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { EventAddComponent } from './event/event-add/event-add.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'user-homepage', component: UserHomepageComponent },
  { path: 'event-detail', component: EventDetailComponent },
  { path: 'event-add', component: EventAddComponent },
  { path: 'conversation', component: ConversationComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

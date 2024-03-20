import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from "./components/components.module";
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { EventAddComponent } from './event/event-add/event-add.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ChatComponent } from './chat/chat.component';
import { AccountComponent } from './account/account.component';



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AuthenticationComponent,
        UserHomepageComponent,
        EventDetailComponent,
        EventAddComponent,
        EventListComponent,
        ConversationComponent,
        ChatComponent,
        AccountComponent,
        ChatComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports:[
        BrowserModule,
        HttpClientModule,
        ComponentsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
        MatSnackBarModule
    ]
})
export class AppModule { }

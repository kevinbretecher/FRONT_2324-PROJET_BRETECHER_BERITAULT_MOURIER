import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from "./components/components.module";
import { AccountComponent } from './account/account.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AuthenticationComponent,
        AccountComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        ComponentsModule,
        AppRoutingModule,
    ]
})
export class AppModule { }

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
    { path: '',  redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',  component: HomeComponent },
    { path: 'chat', component: ChatComponent },
    { path: '**', redirectTo: 'home' }
];

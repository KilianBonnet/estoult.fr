import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Estoult - Home' },
  { path: 'chat', component: ChatComponent, title: 'Estoult - Chat' },
  { path: '**', redirectTo: 'home' }
];

import { Routes } from '@angular/router';
import { HomeComponent } from './components/page/home/home.component';
import { WildcardComponent } from './components/page/wildcard/wildcard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', component: WildcardComponent },
];

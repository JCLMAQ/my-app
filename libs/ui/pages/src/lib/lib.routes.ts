import { Route } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const uiPagesRoutes: Route[] = [
// order is important
  {path: 'homepage', pathMatch: 'full', component: HomeComponent},
  {path: 'aboutpage', pathMatch: 'full', component: AboutComponent},
  // {path: 'pagenotfoundpage', pathMatch: 'full', component: PageNotFoundComponent},
  // Always at the end
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent},

];

import { Routes } from '@angular/router';
import {OverviewComponent} from './components/pages/overview/overview.component';
import {PageButtonComponent} from './components/pages/page-button/page-button.component';

export const routes: Routes = [
  // add route for page-button
  {path: '', redirectTo: 'overview', pathMatch: 'full'},
  {path: 'overview', component: OverviewComponent},
  {path: 'component', children: [
      {path: 'button', component: PageButtonComponent},
    ]
  }
];

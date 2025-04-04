import { Routes } from '@angular/router';
import {OverviewComponent} from './components/pages/overview/overview.component';
import {PageButtonComponent} from './components/pages/page-button/page-button.component';
import {PageFormCheckboxComponent} from './components/pages/page-form-checkbox/page-form-checkbox.component';
import {PageMaintenanceComponent} from './components/pages/page-maintenance/page-maintenance.component';
import {PageTableComponent} from './components/pages/page-table/page-table.component';

export const routes: Routes = [
  // add route for page-button
  {path: '', redirectTo: 'overview', pathMatch: 'full'},
  {path: 'overview', component: OverviewComponent},
  {path: 'component', children: [
      {path: 'alert', component: PageMaintenanceComponent}, // TODO: add page Alert
      {path: 'button', component: PageButtonComponent},
      {path: 'form', children: [
          {path: 'checkbox', component: PageFormCheckboxComponent},
          {path: 'dropdown', component: PageMaintenanceComponent}, // TODO: add page Dropdown
          {path: 'input', component: PageMaintenanceComponent}, // TODO: add page Input
          {path: 'radiobox', component: PageMaintenanceComponent} // TODO: add page Radiobox
        ]},
      {path: 'accordion', component: PageMaintenanceComponent}, // TODO: add page Accordion
      {path: 'banner', component: PageMaintenanceComponent}, // TODO: add page Banner
      {path: 'modal', component: PageMaintenanceComponent}, // TODO: add page Modal
      {path: 'pagination', component: PageMaintenanceComponent}, // TODO: add page Pagination
      {path: 'table', component: PageTableComponent},
      {path: 'toast', component: PageMaintenanceComponent} // TODO: add page Toast
    ]
  }
];

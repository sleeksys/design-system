import { Routes } from '@angular/router';
import {OverviewComponent} from './components/pages/overview/overview.component';
import {PageAlertComponent} from './components/pages/page-alert/page-alert.component';
import {PageButtonComponent} from './components/pages/page-button/page-button.component';
import {PageFormCheckboxComponent} from './components/pages/page-form-checkbox/page-form-checkbox.component';
import {PageDropdownComponent} from './components/pages/page-dropdown/page-dropdown.component';
import {PageFormInputComponent} from './components/pages/page-form-input/page-form-input.component';
import {PageMaintenanceComponent} from './components/pages/page-maintenance/page-maintenance.component';
import {PageAccordionComponent} from './components/pages/page-accordion/page-accordion.component';
import {PagePaginationComponent} from './components/pages/page-pagination/page-pagination.component';
import {PageTableComponent} from './components/pages/page-table/page-table.component';
import {PageToastComponent} from './components/pages/page-toast/page-toast.component';
import {PageMapsComponent} from './components/pages/page-maps/page-maps.component';
import {OpportunityComponent} from './components/extern/ppr/opportunity/opportunity.component';

export const routes: Routes = [
  // add route for page-button
  {path: '', redirectTo: 'overview', pathMatch: 'full'},
  {path: 'overview', component: OverviewComponent},
  {path: 'component', children: [
      {path: 'alert', component: PageAlertComponent},
      {path: 'button', component: PageButtonComponent},
      {path: 'form', children: [
          {path: 'checkbox', component: PageFormCheckboxComponent},
          {path: 'dropdown', component: PageDropdownComponent},
          {path: 'input', component: PageFormInputComponent},
          {path: 'radiobox', component: PageMaintenanceComponent} // TODO: add page Radiobox
        ]},
      {path: 'accordion', component: PageAccordionComponent}, // TODO: add page Accordion
      {path: 'banner', component: PageMaintenanceComponent}, // TODO: add page Banner
      {path: 'modal', component: PageMaintenanceComponent}, // TODO: add page Modal
      {path: 'pagination', component: PagePaginationComponent},
      {path: 'table', component: PageTableComponent},
      {path: 'toast', component: PageMaintenanceComponent} // not ready
    ]
  },
  {path: 'utils', children: [
      {path: 'maps', component: PageMapsComponent}
    ]
  },
  {path: 'extern', children: [
      {path: 'ppr/opportunity', component: OpportunityComponent}
    ]
  },
];

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SleekUtils} from '../../../services/sleek.utils';

@Component({
  selector: 'page-maintenance',
  imports: [
  ],
  template: `
    <div class="component">
      <div class="component-title">Component <b>{{ component }}</b></div>
      <div class="alert alert-info">
        The component is under maintenance or in implementation. Please check back later.
      </div>
    </div>
  `,
})
export class PageMaintenanceComponent implements OnInit {

  component = '...';

  constructor(private router: Router) {
  }

  ngOnInit() {
    let name = this.router.url.split('/').pop() || '...';
    this.component = SleekUtils.capitalizeFirstLetter(name);
  }
}

import {Component, OnInit} from '@angular/core';
import {DropdownComponent} from '../../templates/form/dropdown/dropdown.component';

@Component({
  selector: 'page-overview',
  imports: [
    DropdownComponent
  ],
  templateUrl: './overview.component.html',
  styles: `
    .component-title { font-size: 30px; }
    .description { font-size: 20px; line-height: 1.8; }
  `
})
export class OverviewComponent implements OnInit {

  now = new Date();

  ngOnInit() {
  }
}

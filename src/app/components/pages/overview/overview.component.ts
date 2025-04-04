import {Component, OnInit} from '@angular/core';
import {TableCellDirective} from '../../templates/table/table-cell.directive';
import {TableDirective} from '../../templates/table/table.directive';

@Component({
  selector: 'page-overview',
  imports: [],
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

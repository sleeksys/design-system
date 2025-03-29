import {Component, OnInit} from '@angular/core';
import {TableComponent} from '../../templates/table/table.component';
import {mockDataTable, mockDataTableClassic, mockDataTableWithFooter} from '../../templates/table/table-mock-data';

@Component({
  selector: 'page-overview',
  imports: [
    TableComponent
  ],
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  dataTable = mockDataTable;
  dataTableClassic = mockDataTableClassic;
  dataTableWithFooter = mockDataTableWithFooter;

  ngOnInit() {
  }
}

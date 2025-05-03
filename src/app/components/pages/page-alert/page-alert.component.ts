import {Component, OnInit} from '@angular/core';
import {TextAlign, ThemeColor} from '../../templates/model';
import {AlertComponent} from '../../templates/alert/alert.component';
import {TableCellDirective} from '../../templates/table/table-cell.directive';
import {TableDirective} from '../../templates/table/table.directive';

@Component({
  selector: 'page-alert',
  imports: [
    AlertComponent,
    TableCellDirective,
    TableDirective
  ],
  templateUrl: './page-alert.component.html',
  styles: `code { margin-bottom: 50px; }`
})
export class PageAlertComponent implements OnInit {

  ngOnInit() {
  }

  getCodeRaw(theme: ThemeColor|null, align?: TextAlign) {
    let themeProp = theme ? `[theme]="'${theme}'"` : '';
    let alignProp = align ? `[align]="'${align}'"` : '';
    let props = themeProp + (theme ? ' ' : '') + alignProp;
    return `<slk-alert ${props}>...</slk-alert>`
  }

  protected readonly alert = alert;
}

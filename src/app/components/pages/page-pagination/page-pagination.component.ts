import {Component} from '@angular/core';
import {PaginationComponent} from '../../templates/pagination/pagination.component';
import {TextAlign} from '../../templates/model';
import {TableCellDirective} from '../../templates/table/table-cell.directive';
import {TableDirective} from '../../templates/table/table.directive';

@Component({
  selector: 'page-pagination',
  imports: [
    PaginationComponent,
    TableCellDirective,
    TableDirective
  ],
  templateUrl: './page-pagination.component.html',
  styles: `code { margin: 0 0 10px; }`
})
export class PagePaginationComponent {

  getCodeRaw(max?: number,
             current?: number,
             align?: TextAlign|undefined,
             addEventListener?: boolean) {
    let propMax = max ? `[max]="${max}"` : '';
    let propCurrent = current ? `[current]="${current}"` : '';
    let propAlign = align ? `[align]="'${align}'"` : '';
    const propEventListener = addEventListener
      ? `\n\t(changed)="alert('Page changed.')"` : '';

    let props = propMax
      + (max && current ? ' ' : '') + propCurrent
      + (current && align ? ' ' : '') + propAlign
      + propEventListener;
    return `<slk-pagination ${props}>...</slk-pagination>`
  }

  eventHandler(event: any) {
    alert('Page changed: ' + event);
  }
}

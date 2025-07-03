import {Component} from '@angular/core';
import {SlkAccordionItem} from '../../templates/model';
import {AccordionComponent} from '../../templates/accordion/accordion.component';
import {TableCellDirective} from '../../templates/table/table-cell.directive';
import {TableDirective} from '../../templates/table/table.directive';

@Component({
  selector: 'page-accordion',
  imports: [
    AccordionComponent,
    TableCellDirective,
    TableDirective
  ],
  templateUrl: './page-accordion.component.html',
  styles: `code { margin-bottom: 30px; }`
})
export class PageAccordionComponent {

  items1: SlkAccordionItem[] = this.getItems();
  items2: SlkAccordionItem[] = this.getItems();
  items3: SlkAccordionItem[] = this.getItems();
  items4: SlkAccordionItem[] = this.getItems(true);

  private getItems(readonly?: boolean): SlkAccordionItem[] {
    let items: SlkAccordionItem[] = [];
    for (let i = 1; i <= 3; i++) {
      items.push({
        title: !readonly ? `Title ${i}` : `Title ${i} (Readonly)`,
        content: `Content ${i}`,
        active: (i === 1 || (readonly ? i === 2 : false)),
      });
    }
    return items;
  }

  getCodeRaw(hasItems: boolean,
             allowMany?: boolean|undefined,
             readonly?: boolean|undefined) {
    let propItems = hasItems ? `[items]="..."` : '[items]="[]"';
    let propAllowMany = (typeof allowMany !== 'undefined') ? `[allowMany]="${allowMany}"` : '';
    let propReadOnly = (typeof readonly !== 'undefined') ? `[readonly]="${readonly}"` : '';
    let props = propItems
      + (hasItems && allowMany ? ' ' : '') + propAllowMany
      + (allowMany && readonly ? ' ' : '') + propReadOnly;
    return `<slk-accordion ${props}></slk-accordion>`
  }
}

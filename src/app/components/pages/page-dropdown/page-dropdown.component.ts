import {Component} from '@angular/core';
import {DropdownComponent} from '../../templates/form/dropdown/dropdown.component';
import {SlkDropdownItem} from '../../templates/model';
import {TableCellDirective} from '../../templates/table/table-cell.directive';
import {TableDirective} from '../../templates/table/table.directive';

@Component({
  selector: 'page-dropdown',
  imports: [
    DropdownComponent,
    TableCellDirective,
    TableDirective
  ],
  templateUrl: './page-dropdown.component.html',
  styles: `code { margin-bottom: 30px; }`
})
export class PageDropdownComponent {

  public itemList1: SlkDropdownItem[] = [
    {label: 'January', value: 1},
    {label: 'February', value: 2},
    {label: 'March', value: 3},
    {label: 'April', value: 4, selected: true},
    {label: 'May', value: 5},
    {label: 'June', value: 6},
    {label: 'July', value: 7},
    {label: 'August', value: 8},
    {label: 'September', value: 9},
    {label: 'October', value: 10},
    {label: 'November', value: 11},
    {label: 'December', value: 12}
  ];
  public itemList2: SlkDropdownItem[] = [
    {label: 'January', value: 1},
    {label: 'February', value: 2},
    {label: 'March', value: 3, selected: true},
    {label: 'April', value: 4},
    {label: 'May', value: 5},
    {label: 'June', value: 6, selected: true},
    {label: 'July', value: 7},
    {label: 'August', value: 8},
    {label: 'September', value: 9, selected: true},
    {label: 'October', value: 10},
    {label: 'November', value: 11},
    {label: 'December', value: 12}
  ];
  public itemList3: SlkDropdownItem[] = [
    {label: 'January', value: 1},
    {label: 'February', value: 2},
    {label: 'March', value: 3, selected: true},
    {label: 'April', value: 4},
    {label: 'May', value: 5},
    {label: 'June', value: 6, selected: true},
    {label: 'July', value: 7},
    {label: 'August', value: 8},
    {label: 'September', value: 9, selected: true},
    {label: 'October', value: 10},
    {label: 'November', value: 11},
    {label: 'December', value: 12}
  ];

  getPreCode(label: string, items?: boolean, multiselect?: boolean,
             preview?: boolean,
             collapse?: boolean): string {
    let labelProp = `[label]="'${label}'"`;
    let itemsProp = items ? `[items]="..."` : '';
    let multiselectProp = multiselect ? `[multiselect]="${multiselect}"` : '';
    let previewProp = preview ? `[preview]="${preview}"` : '';
    let collapseProp = collapse ? `[collapse]="${collapse}"` : '';
    let props = `${labelProp} ${itemsProp} ${multiselectProp} ${previewProp} ${collapseProp}`;

    // clean up empty props
    props = props.replace(/\s+/g, ' ').trim();
    return `<slk-dropdown ${props}></slk-dropdown>`;
  }
}

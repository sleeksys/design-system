import {Component} from '@angular/core';
import {TextAlign, ThemeColor} from '../../templates/model';
import {AlertComponent} from '../../templates/alert/alert.component';
import {TableCellDirective} from '../../templates/table/table-cell.directive';
import {TableDirective} from '../../templates/table/table.directive';
import {InputComponent} from '../../templates/form/input/input.component';
import {InputNumberComponent} from '../../templates/form/input/input-number.component';
import {InputEmailComponent} from '../../templates/form/input/input-email.component';

@Component({
  selector: 'page-form-input',
  imports: [
    AlertComponent,
    TableCellDirective,
    TableDirective,
    InputComponent,
    InputNumberComponent,
    InputEmailComponent
  ],
  templateUrl: './page-form-input.component.html',
  styles: `code { margin-bottom: 30px; } label { display: block; margin-bottom: 10px; }`
})
export class PageFormInputComponent {

  getCodeRaw(theme: ThemeColor|null, align?: TextAlign) {
    let themeProp = theme ? `[theme]="'${theme}'"` : '';
    let alignProp = align ? `[align]="'${align}'"` : '';
    let props = themeProp + (theme ? ' ' : '') + alignProp;
    return `<slk-alert ${props}>...</slk-alert>`
  }

  getPreCodeInputNumber(value?: number, min?: number, max?: number, step?: number, required?: boolean) {
    let valueProp = value ? `[value]="${value}"` : '';
    let minProp = min ? `[min]="${min}"` : '';
    let maxProp = max ? `[max]="${max}"` : '';
    let stepProp = step ? `[step]="${step}"` : '';
    let requiredProp = required ? `[required]="${required}"` : '';
    let props = `${valueProp} ${minProp} ${maxProp} ${stepProp} ${requiredProp}`;

    // clean up empty props
    props = props.replace(/\s+/g, ' ').trim();
    return `<slk-input-number ${props}></slk-input-number>`;
  }

  getPreCodeInputEmail(value?: string, required?: boolean) {
    let valueProp = value ? `[value]="${value}"` : '';
    let requiredProp = required ? `[required]="${required}"` : '';
    let props = `${valueProp} ${requiredProp}`;

    // clean up empty props
    props = props.replace(/\s+/g, ' ').trim();
    return `<slk-input-email ${props}></slk-input-email>`;
  }
}

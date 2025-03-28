import {Component, OnInit} from '@angular/core';
import {CheckboxComponent} from '../../templates/form/checkbox/checkbox.component';
import {ThemeColor} from '../../templates/model';

@Component({
  selector: 'page-checkbox',
  imports: [
    CheckboxComponent
  ],
  templateUrl: './page-form-checkbox.component.html'
})
export class PageFormCheckboxComponent implements OnInit {

  ngOnInit() {
  }

  getCodeRaw(theme?: ThemeColor|null, checked?: boolean|null, appendEventListener?: boolean) {
    const checkStatusCodeRaw = (checked !== null)
      ? (checked ? `\n\t[checked]="true"` : `\n\t[checked]="false"`) : '';
    const eventCodeRaw = appendEventListener
      ? `\n\t(onChange)="alert('Checkbox changed!')"` : '';
    let text = 'Checkbox';
    if (theme) {
      text = theme.charAt(0).toUpperCase() + theme.slice(1) + ' Checkbox';
    }
    if (appendEventListener) {
      text = `Checkbox Event`;
    }
    if (checked) {

    }

    return `<slk-checkbox`
      + `${checkStatusCodeRaw}`
      + `\n\t[label]="'${text}'"${eventCodeRaw}></slk-checkbox>`
  }

  protected readonly alert = alert;
}

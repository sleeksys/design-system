import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from '../../templates/button/button.component';
import {ThemeColor} from '../../templates/model';

@Component({
  selector: 'page-button',
  imports: [
    ButtonComponent
  ],
  templateUrl: './page-button.component.html'
})
export class PageButtonComponent implements OnInit {

  ngOnInit() {
  }

  getCodeRaw(theme: ThemeColor, appendEventListener?: boolean) {
    const eventCodeRaw = appendEventListener
      ? `\n\t(onClick)="alert('Button clicked!')"` : '';
    let text = theme.charAt(0).toUpperCase() + theme.slice(1) + ' Button';
    if (appendEventListener) {
      text = `Clickable Button`;
    }

    return `<slk-button` +
      `\n\t[theme]="'${theme}'"` +
      `\n\t[text]="'${text}'"${eventCodeRaw}></slk-button>`
  }

  protected readonly alert = alert;
}

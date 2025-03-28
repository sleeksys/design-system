import {Component, OnInit} from '@angular/core';
import {ButtonComponent, ButtonTheme} from '../../templates/button/button.component';

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

  getCodeRaw(theme: ButtonTheme, appendClick?: boolean) {
    const onClickCodeRaw = appendClick ? `\n\t(onClick)="alert('Button clicked!')"` : '';
    let text = theme.charAt(0).toUpperCase() + theme.slice(1) + ' Button';
    if (appendClick) {
      text = `Clickable Button`;
    }

    return `<slk-button` +
      `\n\t[theme]="'${theme}'"` +
      `\n\t[text]="'${text}'"${onClickCodeRaw}></slk-button>`
  }

  protected readonly alert = alert;
}

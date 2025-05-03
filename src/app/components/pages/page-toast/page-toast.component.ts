import {Component} from '@angular/core';
import {ToastComponent} from '../../templates/toast/toast.component';
import {ButtonComponent} from '../../templates/button/button.component';
import {ThemeColor} from '../../templates/model';

@Component({
  selector: 'page-accordion',
  imports: [
    ToastComponent,
    ButtonComponent
  ],
  templateUrl: './page-toast.component.html',
  styles: `code { margin-bottom: 50px; }`
})
export class PageToastComponent {

  showToast1 = false;
  showToast2 = false;
  showToast3 = false;
  showToast4 = false;

  showToast1Click() {
    this.showToast1 = true;
    setTimeout(() => {
      this.showToast1 = false;
    }, 2000);
  }

  showToast2Click() {
    this.showToast2 = true;
    setTimeout(() => {
      this.showToast2 = false;
    }, 2000);
  }

  showToast3Click() {
    this.showToast3 = true;
    setTimeout(() => {
      this.showToast3 = false;
    }, 2000);
  }

  showToast4Click() {
    this.showToast4 = true;
    setTimeout(() => {
      this.showToast4 = false;
    }, 2000);
  }

  getCodeRaw(theme?: ThemeColor,
             timeout?: number) {
    let propTheme = theme ? `[theme]="'${theme}'"` : '';
    let propTimeout = timeout ? `[timeout]="${timeout}"` : '';
    let props = propTheme
      + (theme && timeout ? ' ' : '') + propTimeout;
    return `<slk-toast ${props}></slk-toast>`
  }
}

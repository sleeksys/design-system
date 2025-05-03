import {Component, Input, OnInit} from '@angular/core';
import {ThemeColor} from '../model';

@Component({
  selector: 'slk-toast',
  imports: [],
  template: `<div [className]="getClass()">
    <ng-content></ng-content>
  </div>`,
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {

  @Input() theme: ThemeColor|undefined;
  /*** Timeout in seconds */
  @Input() timeout: number = 5;
  /*** Show toast */
  @Input() display: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this.display = false;
    }, (this.timeout * 1000));
  }

  getClass() {
    let className = 'slk-toast';
    if (this.theme) {
      className += ` slk-toast-theme-${this.theme}`;
    }
    if (this.display) {
      className += ' visible';
    }
    return className;
  }
}

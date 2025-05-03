import {Component, Input} from '@angular/core';
import {TextAlign, ThemeColor} from '../model';

@Component({
  selector: 'slk-alert',
  imports: [],
  template: `<div [className]="getClass()">
    <ng-content></ng-content>
  </div>`,
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  @Input() theme: ThemeColor = 'secondary';
  @Input() align: TextAlign = 'left';

  getClass() {
    return `alert alert-${this.theme} alert-align-${this.align}`;
  }
}

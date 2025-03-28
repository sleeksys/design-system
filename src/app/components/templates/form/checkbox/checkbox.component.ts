import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SleekUtils} from '../../../../services/sleek.utils';
import {ThemeColor} from '../../model';

@Component({
  selector: 'slk-checkbox',
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent implements AfterViewInit, OnInit {

  @Output() onChange = new EventEmitter<boolean>();
  @Input() checked = false;
  @Input() theme!: ThemeColor;
  @Input() label!: string;

  eltId = SleekUtils.generateHash();
  toggleClazzName = 'toggle';

  ngOnInit() {
    // add class name
    if (this.theme) {
      console.log(this.theme);
      this.toggleClazzName = `toggle toggle--${this.theme}`;
    }
  }

  ngAfterViewInit() {
    // add label
    if (!this.label) {
      this.label = 'Checkbox label';
    }

  }

  onChanged(event: Event) {
    const checkbox = (event.target as HTMLInputElement);
    this.onChange.emit(checkbox.checked);
  }
}

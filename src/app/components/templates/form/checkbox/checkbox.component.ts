import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {SleekUtils} from '../../../../services/sleek.utils';

@Component({
  selector: 'slk-checkbox',
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent implements AfterViewInit {

  @Output() onChange = new EventEmitter<boolean>();
  @Input() label: string | undefined;

  eltId = SleekUtils.generateUUID();

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

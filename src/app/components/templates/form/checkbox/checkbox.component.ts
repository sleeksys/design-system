import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SleekUtils} from '../../../../services/sleek.utils';
import {ThemeColor} from '../../model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'slk-checkbox',
  imports: [
    NgIf
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent implements AfterViewInit, OnInit {

  @Output() onChange = new EventEmitter<boolean>();
  @Input() switchMode = true;
  @Input() checked = false;
  @Input() theme!: ThemeColor;
  @Input() label!: string;

  eltId = SleekUtils.generateHash();
  toggleClazzName = 'toggle';
  squareClazzName = 'checkbox-square';

  ngOnInit() {
    this.updateElementsClazzName();
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

  onChecked() {
    this.checked = !this.checked;
    this.onChange.emit(this.checked);

    this.updateElementsClazzName();
  }

  private updateElementsClazzName() {
    this.toggleClazzName = 'toggle';
    this.squareClazzName = 'checkbox-square';

    // add class name
    if (this.theme) {
      this.toggleClazzName += ` toggle--${this.theme}`;
      this.squareClazzName += ` square--${this.theme}`;
    }
    if (this.checked) {
      this.squareClazzName += ' active';
    }
  }
}

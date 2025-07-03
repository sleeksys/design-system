import {Component, Input, OnInit, signal} from '@angular/core';
import {SlkInputType} from '../../model';
import {NgIf} from '@angular/common';
import {AlertComponent} from '../../alert/alert.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'slk-input',
  imports: [
    NgIf,
    AlertComponent,
    FormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {

  @Input() inputType: SlkInputType = 'text';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() maxLength: number = 255;
  @Input() pattern: string|undefined;
  @Input() required: boolean = false;

  valid = signal(false);
  errorMessage: string|null = 'Invalid input';

  ngOnInit() {
    this.validate();
  }

  validate() {
    if (this.value === '') {
      this.errorMessage = null;
      this.valid.set(!this.required);
      return;
    }

    if (this.value.length > this.maxLength) {
      this.errorMessage = `Maximum allowed length ${this.maxLength} is exceeded.`;
      this.valid.set(false);
      return;
    }

    if (this.pattern && !new RegExp(this.pattern).test(this.value)) {
      this.errorMessage = 'Invalid input. Pattern mismatch';
      this.valid.set(false);
      return;
    }

    this.valid.set(true);
  }
}

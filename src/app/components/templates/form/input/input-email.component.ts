import {Component, Input, OnInit, signal} from '@angular/core';
import {NgIf} from '@angular/common';
import {AlertComponent} from '../../alert/alert.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'slk-input-email',
  imports: [
    NgIf,
    AlertComponent,
    FormsModule
  ],
  template: `<div class="slk-input slk-input-email">
    <input type="email"
           [className]="!valid() ? 'slk-input-error' : ''"
           [(ngModel)]="value"
           [required]="required"
           [placeholder]="placeholder"
           [maxLength]="maxLength"
           (change)="validate()" />
    <slk-alert *ngIf="!valid && errorMessage" [theme]="'danger'">{{ errorMessage }}</slk-alert>
  </div>`,
  styleUrl: './input.component.scss'
})
export class InputEmailComponent implements OnInit {

  @Input() value: string | undefined;
  @Input() placeholder: string = '';
  @Input() maxLength: number = 255;
  @Input() required: boolean = false;

  valid = signal(false);
  errorMessage: string|null = 'Invalid input';

  ngOnInit() {
    this.validate();
  }

  validate() {
    if (this.value === '' || this.value === undefined) {
      this.errorMessage = null;
      this.valid.set(!this.required);
      return;
    }

    if (this.value.length > this.maxLength) {
      this.errorMessage = `Maximum allowed length ${this.maxLength} is exceeded.`;
      this.valid.set(false);
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.value)) {
      this.errorMessage = 'Invalid email format.';
      this.valid.set(false);
      return;
    }
    this.valid.set(true);
  }
}

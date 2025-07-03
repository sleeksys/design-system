import {Component, Input, OnInit, signal} from '@angular/core';
import {NgIf} from '@angular/common';
import {AlertComponent} from '../../alert/alert.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'slk-input-number',
  imports: [
    NgIf,
    AlertComponent,
    FormsModule
  ],
  template: `<div class="slk-input slk-input-number">
    <input type="number"
           [className]="!valid ? 'slk-input-error' : ''"
           [(ngModel)]="value"
           [required]="required"
           [placeholder]="placeholder"
           [max]="max"
           [min]="min"
           [step]="step"
           (keyup)="validate()" />
    <slk-alert *ngIf="!valid && errorMessage" [theme]="'danger'">{{ errorMessage }}</slk-alert>
  </div>`,
  styleUrl: './input.component.scss'
})
export class InputNumberComponent implements OnInit {

  @Input() value: number | undefined;
  @Input() max: number = 1_000_000_000; // max value is 1 billion
  @Input() min: number = 0; // min value is 0
  @Input() step: number = 1;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;

  valid = signal(false);
  errorMessage: string|null = 'Invalid input';

  ngOnInit() {
    this.validate();
  }

  validate() {
    if (this.value === undefined) {
      this.errorMessage = null;
      this.valid.set(!this.required);
      return;
    }

    const numValue = this.value;
    if (this.min > numValue) {
      this.errorMessage = `Expected min value ${this.min}.`;
      this.valid.set(false);
      return;
    }
    if (this.max < numValue) {
      this.errorMessage = `Expected max value ${this.max}.`;
      this.valid.set(false);
      return;
    }
    this.valid.set(true);
  }
}

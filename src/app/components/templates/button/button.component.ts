import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ThemeColor} from '../model';

@Component({
  selector: 'slk-button',
  imports: [],
  template: `<button class="slk-btn" [disabled]="disabled" #button></button>`,
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements AfterViewInit {

  @Output() onClick = new EventEmitter();
  @Input() theme!: ThemeColor;
  @Input() text!: string;
  @Input() disabled: boolean = false;

  @ViewChild('button') elt!: ElementRef;

  ngAfterViewInit() {
    this.elt.nativeElement.textContent = this.text || 'Button';

    // add theme class
    if (this.theme) {
      this.elt.nativeElement.classList.add(`slk-btn--${this.theme}`);
    }

    // add click event listener
    this.elt.nativeElement.addEventListener('click', () => {
      this.onClick.emit();
    });
  }
}

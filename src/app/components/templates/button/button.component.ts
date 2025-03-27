import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

export type ButtonTheme = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'slk-button',
  imports: [],
  template: `<button class="slk-btn" #elt></button>`,
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements AfterViewInit {

  @Output() onClick = new EventEmitter();
  @Input() theme: ButtonTheme | undefined;
  @Input() text: string | undefined;

  @ViewChild('elt') elt: any;

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

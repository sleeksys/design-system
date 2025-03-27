import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'slk-checkbox',
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent implements AfterViewInit {

  @Output() onChange = new EventEmitter<boolean>();
  @Input() label: string | undefined;

  @ViewChild('checkbox') elt!: ElementRef;

  ngAfterViewInit() {
    const element = this.elt.nativeElement;

    // add label
    element.querySelector('span.label').textContent = this.label || 'Checkbox label';

    // add change event listener
    element.addEventListener('click', () => {
      const checked = (element.classList.contains('active'));
      if (checked) {
        element.classList.remove('active');
      } else {
        element.classList.add('active');
      }
      this.onChange.emit(!checked);
    });
  }
}

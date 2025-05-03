import {AfterViewInit, Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[slkTable]',
})
export class TableDirective implements AfterViewInit {

  @Input() locale: 'de-DE' | 'en-EN' = 'en-EN';
  @Input() valign: 'top' | 'bottom' | 'middle' = 'middle';
  @Input() format?: 'striped';

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.className = this.getClazzName();
  }

  getClazzName() {
    let clazz = this.elementRef.nativeElement.className;

    switch (this.format) {
      case 'striped':
        clazz += ' slk-table-striped';
        break;
    }
    return `slk-table${clazz}`;
  }
}

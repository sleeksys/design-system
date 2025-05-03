import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
import {SlkTableCellFormat} from '../model';

@Directive({
  selector: '[slkTableCell]',
})
export class TableCellDirective implements OnChanges {

  @Input() format!: SlkTableCellFormat;
  @Input() text: string|any;
  @Input() link?: string;
  @Input() style?: any;
  @Input() align: 'left' | 'center' | 'right' = 'left';

  constructor(private elementRef: ElementRef) {}

  ngOnChanges() {
    const elt = this.elementRef.nativeElement;
    if (!elt.closest('table').hasAttribute('slkTable')) {
      // don't do anything if the table is not a slkTable
      return;
    }
    if (this.align) {
      elt.classList.add('slk-table-cell');
      elt.classList.add('slk-table-cell-' + this.align);
    }
    this.applyStyle();

    elt.innerHTML = this.getText();
  }

  getText() {
    let value = this.text || this.elementRef.nativeElement.textContent;
    if (value === null || value === undefined) {
      return '--';
    }

    const locale = this.getLocale();
    switch (this.format) {
      case 'number':
        // convert to number with a thousand separator
        return parseFloat(value).toLocaleString(locale);

      case 'date':
        // convert to date without time
        return (value as Date).toLocaleDateString(locale, {day: '2-digit', month: '2-digit', year: 'numeric'});

      case 'datetime':
        // convert to date with time (hour and minute)
        return (value as Date).toLocaleString(locale, {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'});

      case 'time':
        return (value as Date).toLocaleDateString(locale, {hour: '2-digit', minute: '2-digit'});

      case 'percentage':
        return `${parseFloat(value).toLocaleString(locale)}%`;

      case 'image':
        return `<img src="${this.link}" alt="${value}" style="${this.mapImageStyle()}" />`;

      case 'link':
        return `<a href="${this.link}">${value || this.link}</a>`;
    }
    return (value as string);
  }

  private getLocale(): 'de-DE' | 'en-EN' {
    const elt = this.elementRef.nativeElement;
    return elt.closest('table').getAttribute('locale') || 'en-EN';
  }

  private mapImageStyle() {
    const style = this.style;
    if (style) {
      return Object.keys(style).map(key => `${key}:${style[key]}`).join(';');
    }
    return '';
  }

  private applyStyle() {
    const elt = this.elementRef.nativeElement;
    const tableElt = elt.closest('table');

    // set default style
    if (this.style && this.format !== 'image') {
      Object.keys(this.style).forEach(key => {
        elt.style[key] = this.style[key];
      });
    }

    // add vertical align
    const valign = tableElt.getAttribute('valign');
    if (valign) {
      //elt.style.verticalAlign = valign;
    }
  }
}

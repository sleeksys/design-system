import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {SlkAccordionItem} from '../model';

@Component({
  selector: 'slk-accordion',
  imports: [
    NgForOf
  ],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent implements OnInit {

  @Input() items: SlkAccordionItem[] = [];
  @Input() allowMany: boolean = false;
  @Input() readonly: boolean = false;

  ngOnInit() {
    if (this.items.length === 0) {
      this.items.push({
        title: 'Invalid Content',
        content: 'Error: empty list is not allowed in an accordion.',
        active: true
      });
      this.readonly = true;
    }
  }

  toggle(item: SlkAccordionItem) {
    if (this.readonly) {
      return;
    }

    if (item.active) {
      item.active = false;
    } else {
      if (!this.allowMany) {
        this.items.forEach(i => i.active = false);
      }
      item.active = true;
    }
  }
}

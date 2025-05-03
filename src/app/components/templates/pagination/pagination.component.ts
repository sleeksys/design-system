import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {SlkPage, TextAlign} from '../model';

@Component({
  selector: 'slk-pagination',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {

  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Input() max: number = 1;
  @Input() current: number = 1;
  @Input() align: TextAlign = 'center';

  pages: SlkPage[] = [];
  display: boolean = false;

  ngOnInit() {
    this.display = this.max > 1;
    this.createPages();
  }

  private createPages() {
    const delta = 1; // number of pages to show around current
    const range = [];
    const rangeWithDots: SlkPage[] = [];
    let l;

    for (let i = 1; i <= this.max; i++) {
      if (i === 1 || i === this.max || (i >= this.current - delta && i <= this.current + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push({value: l + 1});
        } else if (i - l !== 1) {
          rangeWithDots.push({value: '...'});
        }
      }
      rangeWithDots.push({value: i});
      l = i;
    }
    this.pages = rangeWithDots.map(p => {
      p.active = p.value === this.current;
      return p;
    });
  }

  hasPrev(): boolean {
    return this.current > 1;
  }

  hasNext(): boolean {
    return this.current < this.max;
  }

  onPageClick(page: SlkPage) {
    if (typeof page.value === 'number') {
      this.current = page.value;
      this.createPages();
      this.changed.emit(this.current);
    }
  }

  onPrevClick() {
    if (this.current > 1) {
      this.current--;
      this.createPages();
      this.changed.emit(this.current);
    }
  }

  onNextClick() {
    if (this.current < this.max) {
      this.current++;
      this.createPages();
      this.changed.emit(this.current);
    }
  }
}

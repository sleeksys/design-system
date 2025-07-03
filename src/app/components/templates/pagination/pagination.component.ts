import {Component, computed, EventEmitter, input, Output, Signal} from '@angular/core';
import {SlkPage, TextAlign} from '../model';

@Component({
  selector: 'slk-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Output() changed: EventEmitter<any> = new EventEmitter();
  max = input<number>(1);
  current = input<number>(1);
  align = input<TextAlign>('center');

  pages: Signal<SlkPage[]> = computed(() => this.createPages(this.current(), this.max()));
  display: Signal<boolean> = computed(() => this.max() > 1);
  hasPrev: Signal<boolean> = computed(() => this.current() > 1);
  hasNext: Signal<boolean> = computed(() => this.current() < this.max());

  private createPages(page: number, total: number) {
    const delta = 1; // number of pages to show around current
    const range = [];
    const rangeWithDots: SlkPage[] = [];
    let l;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= page - delta && i <= page + delta)) {
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
    return rangeWithDots.map(p => {
      p.active = p.value === page;
      // generate a unique trackId for each page
      p.trackId = `track-id-${Math.random().toString(36).substring(2, 15)}`;
      return p;
    });
  }

  onPageClick(page: SlkPage) {
    if (typeof page.value === 'number') {
      this.changed.emit(page.value);
    }
  }

  onPrevClick() {
    if (this.current() > 1) {
      this.changed.emit(this.current() - 1);
    }
  }

  onNextClick() {
    if (this.current < this.max) {
      this.changed.emit(this.current() + 1);
    }
  }
}

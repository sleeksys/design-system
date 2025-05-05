import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SlkDropdownItem} from '../../model';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowDown, faArrowUp, faCheck} from '@fortawesome/free-solid-svg-icons';
import {NgForOf, NgIf} from '@angular/common';
import {ButtonComponent} from '../../button/button.component';

@Component({
  selector: 'slk-dropdown',
  imports: [
    FaIconComponent,
    NgIf,
    NgForOf,
    ButtonComponent
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit {

  @Input() label: string = 'Dropdown label';
  @Input() items: SlkDropdownItem[] = [];
  @Input() multiselect: boolean = false;
  @Input() preview: boolean = false;
  @Input() collapse: boolean = true;

  @Output() changed: EventEmitter<SlkDropdownItem> = new EventEmitter();

  protected readonly iconArrowUp = faArrowUp;
  protected readonly iconArrowDown = faArrowDown;
  protected readonly iconChecked = faCheck;

  public current: string|undefined;
  public opened: boolean = false;
  public changedDetected: boolean = false;

  ngOnInit() {
    this.enablePreview();
  }

  private enablePreview() {
    if (this.preview) {
      // single select
      if (!this.multiselect) {
        this.current = this.items.find(item => item.selected)?.label;
      }

      // multi select
      if (this.multiselect) {
        const matches = this.items.filter(item => item.selected).length;
        this.current = (matches <= 1)
          ? this.items.find(item => item.selected)?.label
          : `${matches} selected`;
      }
    }
  }

  private onSingleSelectChanged(item: SlkDropdownItem) {
    this.items.forEach(item => {
      item.selected = false;
    });
    item.selected = true;

    // collapse dropdown
    if (this.collapse) {
      this.opened = false;
    }
  }

  private onMultiSelectChanged(item: SlkDropdownItem) {
    item.selected = !item.selected;
    if (item.selected) {
      this.current = item.label;
    } else {
      this.current = undefined;
    }
    this.detectChanges();
  }

  private detectChanges() {
    this.changedDetected = true;
  }

  public toggle() {
    this.opened = !this.opened;
  }

  public onItemClicked(item: SlkDropdownItem) {
    if (this.multiselect) {
      this.onMultiSelectChanged(item);
    } else {
      this.onSingleSelectChanged(item);
    }

    this.enablePreview();
    this.changed.emit(item);
  }

  public selectAll() {
    this.items.forEach(item => {
      item.selected = true;
    });
    this.enablePreview();
    this.detectChanges();
  }

  public deselectAll() {
    this.items.forEach(item => {
      item.selected = false;
    });
    this.enablePreview();
    this.detectChanges();
  }

  public apply() {
    // collapse dropdown
    if (this.collapse) {
      this.opened = false;
    }

    // emit changes
    this.changed.emit();
  }
}

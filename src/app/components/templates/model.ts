export type ThemeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark';
export type TextAlign = 'left' | 'center' | 'right';
export type SlkTableCellFormat = 'text' | 'number' | 'date' | 'time' | 'datetime' | 'percentage' | 'image' | 'link';

export interface SlkAccordionItem {
  title: string;
  content: string;
  active?: boolean;
}

export interface SlkPage {
  value: string|number;
  active?: boolean;
}

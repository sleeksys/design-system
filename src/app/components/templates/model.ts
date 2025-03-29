export type ThemeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark';
export type TableCellType = 'text' | 'number' | 'date' | 'time' | 'datetime' | 'percentage' | 'image' | 'link';

export interface DataTable {
  // head should have only one row
  head: DataTableCell[] | any[];
  // body can have multiple rows
  body: DataTableCell[][] | any[][];
  // foot can have multiple rows
  foot?: DataTableCell[][] | any[][];
}

export interface DataTableCell {
  type?: TableCellType;
  value: string | number | Date | null;
  urlText?: string;
  align?: 'left' | 'center' | 'right';
}

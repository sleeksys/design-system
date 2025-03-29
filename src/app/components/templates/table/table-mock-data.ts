import {DataTable} from '../model';

export const mockDataTable: DataTable = {
  head: [
    {type: 'text', value: 'Product Name'},
    {type: 'text', value: 'Category'},
    {type: 'text', value: 'Retail Price'},
    {type: 'text', value: 'Percentage'},
    {type: 'text', value: 'Created At'},
    {type: 'text', value: 'Last viewed'},
    {type: 'text', value: 'Product URL'},
  ],
  body: [
    [
      {type: 'text', value: 'Product 1'},
      {type: 'text', value: 'Phones & Accessories'},
      {type: 'number', value: 45678},
      {type: 'percentage', value: 73},
      {type: 'date', value: new Date()},
      {type: 'datetime', value: new Date()},
      {type: 'link', value: 'https://example.com/product/1', urlText: 'Link 1'}
    ],
    [
      {type: 'text', value: 'Product 2'},
      {type: 'text', value: 'Phones & Accessories'},
      {type: 'number', value: 45678},
      {type: 'percentage', value: 73},
      {type: 'date', value: new Date()},
      {type: 'datetime', value: new Date()},
      {type: 'link', value: 'https://example.com/product/2', urlText: 'Link 2'}
    ],
    [
      {type: 'text', value: 'Product 3'},
      {type: 'text', value: 'Phones & Accessories'},
      {type: 'number', value: 45678},
      {type: 'percentage', value: 73},
      {type: 'date', value: new Date()},
      {type: 'datetime', value: new Date()},
      {type: 'link', value: 'https://example.com/product/3', urlText: 'Link 3'}
    ],
    [
      {type: 'text', value: 'Product 4'},
      {type: 'text', value: 'Phones & Accessories'},
      {type: 'number', value: 45678},
      {type: 'percentage', value: 73},
      {type: 'date', value: new Date()},
      {type: 'datetime', value: new Date()},
      {type: 'link', value: 'https://example.com/product/4', urlText: 'Link 4'}
    ]
  ]
};

export const mockDataTableClassic: DataTable = {
  head: [
    'Product Name',
    'Category',
    'Retail Price',
    'Currency',
    'Percentage'
  ],
  body: [
    [
      'Product 1',
      'Phones & Accessories',
      45678,
      'eur',
      73
    ],
    [
      'Product 2',
      'Phones & Accessories',
      45678,
      'eur',
      73
    ],
    [
      'Product 3',
      'Phones & Accessories',
      45678,
      'eur',
      73
    ],
    [
      'Product 4',
      'Phones & Accessories',
      45678,
      'eur',
      73
    ]
  ]
};

export const mockDataTableWithFooter: DataTable = {
  head: [
    'Product Name',
    'Category',
    'Retail Price',
    'Currency',
    'Percentage'
  ],
  body: [
    [
      'Product 1',
      'Phones & Accessories',
      45678,
      'eur',
      73
    ],
    [
      'Product 2',
      'Phones & Accessories',
      45678,
      'eur',
      73
    ],
    [
      'Product 3',
      'Phones & Accessories',
      45678,
      'eur',
      73
    ],
    [
      'Product 4',
      'Phones & Accessories',
      45678,
      'eur',
      73
    ]
  ],
  foot: [
    [
      '',
      '',
      {type: 'number', value: 182712, align: 'center'},
      'eur',
      {type: 'percentage', value: 100}
    ]
  ]
};

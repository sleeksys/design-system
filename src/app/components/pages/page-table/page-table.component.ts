import {Component, OnInit} from '@angular/core';
import {TableCellDirective} from '../../templates/table/table-cell.directive';
import {TableDirective} from '../../templates/table/table.directive';

@Component({
  selector: 'page-table',
  imports: [
    TableCellDirective,
    TableDirective
  ],
  templateUrl: './page-table.component.html'
})
export class PageTableComponent implements OnInit {

  now = new Date();

  ngOnInit() {
    this.completeTagCode();
  }

  getTableRaw(tableId: string) {
    const elt = document.getElementById(tableId);
    if (elt) {
      let html = elt.outerHTML;

      // remove some attributes from html
      html = html.replace(/id=".*?"/g, '');
      html = html.replace(/class=".*?"/g, '');
      html = html.replace(/slktable=".*?"/g, 'slkTable');
      html = html.replace(/slktablecell=".*?"/g, 'slkTableCell');
      html = html.replace(/ ng-reflect-align=".*?"/g, '');
      html = html.replace(/ ng-reflect-format=".*?"/g, '');
      html = html.replace(/ ng-reflect-link=".*?"/g, '');
      html = html.replace(/ ng-reflect-locale=".*?"/g, '');
      html = html.replace(/ ng-reflect-text=".*?"/g, '');
      html = html.replace(' >', '>');

      return `${this.formatRawCode(html)}`;
    }
    return '';
  }

  private completeTagCode() {
    document.querySelectorAll('pre')
      .forEach(elt => {
        if (elt.getAttribute('rel')) {
          elt.innerText = this.getTableRaw(elt.getAttribute('rel') || '');
        }
      });
  }

  private formatRawCode(html: string) {
    let tab = '\t';
    let result = '';
    let indent= '';
    let currentTag = '';

    html.split(/>\s*</).forEach(function(element) {
      let tag = element.split(' ')[0];
      if (element.match( /^\/\w/ )) {
        indent = indent.substring(tab.length);
      }

      result += (tag === 'img' ? tab : '') + (indent + '<' + element + '>\r\n');

      if (element.match( /^<?\w[^>]*[^\/]$/ ) && !element.startsWith("input")) {
        indent += (tag !== currentTag) ? tab : '';
      }
      currentTag = tag;
    });

    return result.substring(1, result.length-3);
  }
}

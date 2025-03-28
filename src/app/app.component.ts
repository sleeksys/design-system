import {AfterViewInit, Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {

  ngAfterViewInit() {
    // get all tags beginning with 'slk-' in code snippets
    const tags = document.querySelectorAll('code pre');
    tags.forEach(tag => {
      console.log(tag)
    });
  }
}

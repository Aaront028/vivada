import { Component } from '@angular/core';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: '<p>{{ apiUrl }}</p>',
  // styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vivada-ui';
  apiUrl: string = environment.apiUrl;
}

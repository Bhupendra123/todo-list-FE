import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-list';
  public loaded: boolean = true;
  private loaderEmitter = null;
  constructor(public apiService: ApiService) {

  }
  ngOnInit() {
    //Event handler app load event.
    this.loaderEmitter = this.apiService.loaderEmitter.subscribe((data) => {
      if (data == true) {
        this.loaded = true;
      }
    });
  }
  ngOnDestroy() {
    this.loaderEmitter.unsubscribe();
  }
}

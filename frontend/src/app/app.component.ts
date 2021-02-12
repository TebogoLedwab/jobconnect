import { Component, OnInit } from '@angular/core';
// import { AlertService } from './services/alert.service';
// import { StoreService } from './services/store.service';
// import { UserService } from './services/user.service';
//import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  title = 'theplug';

  constructor (
    // private userService: UserService,
    // private storeService: StoreService
  ) {

  }
  ngOnInit (): void {

  }
}

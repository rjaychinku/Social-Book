import { Component } from '@angular/core';
import { FbookserviceService } from './service/fbookservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FBook';
  isAuthenticated = false;
  isAdmin = false;
  user: any;
  isExpanded = false;

  constructor(private userService: FbookserviceService) {
    this.userService.loggedInUser.subscribe((latestUserData) => {
      this.isAdmin = latestUserData?.isAdmin == true || latestUserData?.isAdmin == "true";
      this.user = latestUserData;
      this.isAuthenticated = latestUserData != null && latestUserData != undefined && latestUserData != {};
    })
  }

  ngOnInit(): void {

  }

  logout(): void {
    this.userService.logout();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

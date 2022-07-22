import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FbooknetworkserviceService } from '../service/fbooknetworkservice.service';
import { FbookserviceService } from '../service/fbookservice.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private userService: FbookserviceService, private friendService: FbooknetworkserviceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    debugger;
    // let incomingUserId: string;
    // let clickedUrl = this.route.snapshot.routeConfig?.['path'];

    // if (clickedUrl?.includes('setting')) {
    //   incomingUserId = this.userService.getUser()?._id
    // }
    // else {
    //   //came from somehere else
    //   incomingUserId = this.route.snapshot.params['userId'];
    // }

    localStorage.setItem("profileUserId", this.route.snapshot.params['userId']);
  }

  updateProfile() {
    this.router.navigate(['update-profile'], { relativeTo: this.route });
  }

  changePassword() {
    this.router.navigate(['change-password'], { relativeTo: this.route });
  }

}

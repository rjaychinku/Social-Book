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
    let incomingUserId: string = this.route.snapshot.params['userId'];
    let storedUser: any = this.userService.getUser();

    if (incomingUserId != storedUser._id) {
      localStorage.setItem("profileUserId", incomingUserId);
    }

  }

  updateProfile() {
    this.router.navigate(['update-profile'], { relativeTo: this.route });
  }

  changePassword() {
    this.router.navigate(['change-password'], { relativeTo: this.route });
  }

}

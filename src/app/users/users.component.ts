import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FbooknetworkserviceService } from '../service/fbooknetworkservice.service';
import { FbookserviceService } from '../service/fbookservice.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public registeredUsers = new Array();
  public totalPosts: number = 0;
  public totalConnections: number = 0;
  public loggedInUser: any;

  constructor(private usersService: FbookserviceService,
    private toastService: ToastrService,
    private friendService: FbooknetworkserviceService) {

    this.friendService.totalConnectionsObservable.subscribe((latestData) => {
      this.totalConnections = latestData;
    });

    this.friendService.totalPostsObservable.subscribe((latestData) => {
      this.totalPosts = latestData;
    });
  }

  async ngOnInit(): Promise<void> {
    this.loggedInUser = this.usersService.getUser();
    this.usersService.saveUser(this.loggedInUser);
    this.registeredUsers = await this.friendService.getAllRegisteredUsers();
  }

  blockUser(user: any): void {
    let isActive =
    {
      isActive: false
    }

    this.setUser(isActive, user);
  }

  unblockUser(user: any): void {
    let isActive =
    {
      isActive: true
    }

    this.setUser(isActive, user);
  }

  private async setUser(activeObject: any, user: any): Promise<void> {
    debugger;
    await this.friendService.updateUser(user.id, activeObject);

    this.toastService.success(user.firstName + ' ' + user.lastName + ' has been ' + (activeObject.isActive ? 'unblocked!' : 'blocked!'));
    this.registeredUsers = await this.friendService.getAllRegisteredUsers();
  }
}

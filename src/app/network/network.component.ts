import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FbooknetworkserviceService } from '../service/fbooknetworkservice.service';
import { FbookserviceService } from '../service/fbookservice.service';


@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  // public registeredUsers: RegisteredUser[] = [{
  //   _id: "32",
  //   username: "Uncle johnny",
  //   firstName: "Ronald",
  //   lastName: "Chinku",
  //   gender: "male",
  //   dob: "",
  //   phone: "0814583552",
  //   isActive: true,
  //   isAdmin: false,
  //   city: "Jhb",
  //   state: "Gauteng",
  //   country: "South Africa",
  //   pincode: "12345"
  // },
  // {
  //   _id: "15",
  //   username: "the thames",
  //   firstName: "Jabu",
  //   lastName: "Nguni",
  //   gender: "female",
  //   dob: "",
  //   phone: "0795522221",
  //   isActive: true,
  //   isAdmin: false,
  //   city: "Nelspruit",
  //   state: "Mpumalanga",
  //   country: "South Africa",
  //   pincode: "54321"
  // }
  // ];

  public registeredUsers = new Array();
  public totalPosts: number = 0;
  public totalConnections: number = 0;
  public loggedInUser: any;

  constructor(private toastService: ToastrService,
    private userService: FbookserviceService,
    private friendService: FbooknetworkserviceService) {

    this.friendService.totalConnectionsObservable.subscribe((latestData) => {
      this.totalConnections = latestData;
    });

    this.friendService.totalPostsObservable.subscribe((latestData) => {
      this.totalPosts = latestData;
    });
  }

  async ngOnInit(): Promise<void> {
    this.loggedInUser = this.userService.getUser();
    this.userService.saveUser(this.loggedInUser);
    this.registeredUsers = await this.friendService.getAllRegisteredUsers();
    this.friendService.UpdateProfileData(this.totalConnections, this.totalPosts);
  }

  async SendRequest(friendId: string): Promise<void> {

    let friendToBe = {
      userId: this.loggedInUser._id,
      friendId: friendId,
      status: 'Request Pending'
    }

    let message: string = await this.friendService.sendFriendRequest(friendToBe);
    this.toastService.success('You have sent your friend request successfully!', 'Friend Request');
    this.friendService.UpdateProfileData(++this.totalConnections);
  }
}

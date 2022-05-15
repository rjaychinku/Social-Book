import { Component, OnInit } from '@angular/core';
import { Friend } from '../models/friend';
import { FbooknetworkserviceService } from '../service/fbooknetworkservice.service';
import { FbookserviceService } from '../service/fbookservice.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  // public myFriends: Friend[] = [{
  //   _id: "19",
  //   username: "Mr Happy",
  //   firstName: "Mike",
  //   lastName: "Jackson",
  //   gender: "male",
  //   dob: "",
  //   phone: "0798565522",
  //   isActive: true,
  //   isAdmin: false,
  //   city: "Cape Town",
  //   state: "Western Cape",
  //   country: "South Africa",
  //   pincode: "99999"
  // }, {
  //   _id: "26",
  //   username: "Freddy kruger",
  //   firstName: "Menzi",
  //   lastName: "Ngcobo",
  //   gender: "male",
  //   dob: "",
  //   phone: "0712255552",
  //   isActive: true,
  //   isAdmin: false,
  //   city: "Bloem",
  //   state: "Free State",
  //   country: "South Africa",
  //   pincode: "88888"
  // },
  // {
  //   _id: "24",
  //   username: "pyramid games",
  //   firstName: "Kevin",
  //   lastName: "Durant",
  //   gender: "male",
  //   dob: "",
  //   phone: "07144455522",
  //   isActive: true,
  //   isAdmin: false,
  //   city: "Grahamstown",
  //   state: "Eastern Cape",
  //   country: "South Africa",
  //   pincode: "33333"
  // }
  // ];
  public totalPosts: number = 0;
  public totalConnections: number = 0;
  public myFriends = new Array();
  loggedInUser: any;

  constructor(private userService: FbookserviceService, private friendsService: FbooknetworkserviceService) {

    this.friendsService.totalConnectionsObservable.subscribe((latestData) => {
      this.totalConnections = latestData;
    });

    this.friendsService.totalPostsObservable.subscribe((latestData) => {
      this.totalPosts = latestData;
    });
  }

  async ngOnInit(): Promise<void> {
    this.loggedInUser = this.userService.getUser();
    this.userService.saveUser(this.loggedInUser);
    let friendsList: [] = await this.friendsService.getFriendsById(this.loggedInUser._id);

    friendsList.forEach(async (friendReturned): Promise<void> => {
      let friend = await this.friendsService.getUserById(friendReturned['userId']);
      this.myFriends.push(friend);
    });
  }
}

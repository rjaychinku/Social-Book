import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FbooknetworkserviceService } from '../service/fbooknetworkservice.service';
import { FbookserviceService } from '../service/fbookservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('1000ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0, transform: 'translateY(5px)' })),
      ]),
    ]),
  ]
})

export class HomeComponent implements OnInit {

  public totalPosts: number = 0;
  public totalConnections: number = 0;
  public textContent = "Upload pic";
  public onLoad: boolean = true;
  public loggedInUser: any;
  public PostContentTyped: string = '';
  public PhotoImage: any;
  // public posts: Post[] = [
  //   { userId: "1", username: "Ronaldo", userPhotoId: '', postImageId: '', isActive: true, isAdmin: true, profession: "Software developer", post: "000 sample post, A sample post, A sample post A sample post, A sample post, A sample post A sample post, A sample post, A sample post A sample post, A sample post, A sample post" }
  //   , { userId: "12", username: "Chinku", userPhotoId: '', postImageId: '', isActive: true, isAdmin: true, profession: "Painter", post: "444 sample post, A sample post, A sample post A sample post, A sample post, A sample post A sample post, A sample post, A sample post A sample post, A sample post, A sample post" }
  //   , { userId: "2", username: "Junior", userPhotoId: '', postImageId: '', isActive: false, isAdmin: true, profession: "Writer", post: "111 sample post, A sample post, A sample post A sample post, A sample post, A sample post A sample post, A sample post, A sample post A sample post, A sample post, A sample post" }
  //   , { userId: "7", username: "Yakapwasha", userPhotoId: '', postImageId: '', isActive: true, isAdmin: false, profession: "Call center agent", post: "222 sample post, A sample post, A sample post A sample post, A sample post, A sample post A sample post, A sample post, A sample post A sample post, A sample post, A sample post" }
  //   , { userId: "55", username: "Mbolo", userPhotoId: '', postImageId: '', isActive: true, isAdmin: true, profession: "Author", post: "333 sample post, A sample post, A sample post A sample post, A sample post, A sample post A sample post, A sample post, A sample post A sample post, A sample post, A sample post" }
  // ];

  public posts = new Array();
  public friendsPosts = new Array();
  isAdmin: boolean = false;

  constructor(private usersService: FbookserviceService,
    private toastService: ToastrService,
    private friendsService: FbooknetworkserviceService) {

    this.friendsService.totalConnectionsObservable.subscribe((latestData) => {
      this.totalConnections = latestData;
    });

    this.friendsService.totalPostsObservable.subscribe((latestData) => {
      this.totalPosts = latestData;
    });
  }

  async ngOnInit(): Promise<void> {
    this.loggedInUser = this.usersService.getUser();
    this.usersService.saveUser(this.loggedInUser);
    this.isAdmin = this.loggedInUser?.isAdmin;

    this.posts = await this.usersService.getPostsByUserId(this.loggedInUser._id);
    this.totalPosts = this.posts.length;

    let friends: [] = await this.friendsService.getFriendsById(this.loggedInUser._id);
    this.totalConnections = friends.length;


    await this.updateAllPosts();
    this.friendsService.UpdateProfileData(this.totalConnections, this.totalPosts);
  }

  async PostContent(): Promise<void> {
    if (this.PostContentTyped.length > 1) {
      let aPost = { userId: this.loggedInUser._id, userName: this.loggedInUser.email, userPhotoId: '', postImageId: '', isActive: this.loggedInUser.isActive, isAdmin: this.loggedInUser.isAdmin, profession: this.loggedInUser?.profession == undefined || this.loggedInUser?.profession == null ? "QA Tester" : this.loggedInUser?.profession, post: this.PostContentTyped };
      await this.usersService.createPost(aPost);
      this.posts = await this.usersService.getPostsByUserId(this.loggedInUser._id);
      await this.updateAllPosts();
      this.friendsService.UpdateProfileData(this.totalConnections, ++this.totalPosts);
      this.PostContentTyped = '';
    }
  }

  async deletePost(post: any): Promise<void> {

    await this.friendsService.deletePost(post._id);
    this.posts = await this.usersService.getPostsByUserId(this.loggedInUser._id);

    if (post.userId == this.loggedInUser._id)
      this.friendsService.UpdateProfileData(this.totalConnections, --this.totalPosts);

    await this.updateAllPosts();
    this.toastService.success('Post deleted successfully', 'Deleted');
  }

  private async updateAllPosts(): Promise<void> {

    this.friendsPosts = await this.friendsService.getAllPosts();

    this.friendsPosts = this.friendsPosts.sort((n1, n2) => {
      if (n1.createdDate < n2.createdDate) {
        return 1;
      }

      if (n1.createdDate > n2.createdDate) {
        return -1;
      }

      return 0;
    });

  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FbooknetworkserviceService } from 'src/app/service/fbooknetworkservice.service';
import { FbookserviceService } from 'src/app/service/fbookservice.service';


@Component({
  selector: 'profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  profileSettingsForm: FormGroup = new FormGroup({});
  userDetails: any;
  message: string | undefined;
  succssMsg: any;
  errorMsg: string | undefined;
  submitted = false;
  private profileUserId: string | null = '';
  loggedInUser: any;
  profileUser: any;
  loggedInUserisAdmin: boolean = false;

  constructor(private usersService: FbookserviceService,
    private friendsService: FbooknetworkserviceService,
    private toastService: ToastrService,
    private fb: FormBuilder) { }

  get f() { return this.profileSettingsForm.controls; }

  async ngOnInit(): Promise<void> {

    this.profileSettingsForm = this.fb.group({
      firstName: ['userDetails.firstName', Validators.required],
      lastName: ['userDetails.lastName', Validators.required],
      dob: ['userDetails.dob', Validators.required],
      gender: ['userDetails.gender', Validators.required],
      email: ['userDetails.email', Validators.required],
      isAdmin: ['userDetails.isAdmin', Validators.required]
    })

    this.loggedInUser = this.usersService.getUser();
    this.usersService.saveUser(this.loggedInUser);
    this.loggedInUserisAdmin = this.loggedInUser?.isAdmin == true || this.loggedInUser?.isAdmin == "true";

    this.profileUserId = localStorage.getItem("profileUserId");
    this.userDetails = await this.friendsService.getUserById(this.profileUserId);
  }

  updatedate(event: string | number | Date) {
    this.userDetails.dob = new Date(event);
  }

  async onSubmit() {

    this.profileSettingsForm.value.id = this.profileUserId;
    await this.friendsService.updateUser(this.profileUserId, this.profileSettingsForm.value);

    if (this.profileSettingsForm.value['id'] == this.loggedInUser._id) {
      this.loggedInUser.isAdmin = this.profileSettingsForm.value['isAdmin'];
      this.usersService.saveUser(this.loggedInUser);
    }

    this.toastService.success('Profile has been successfully updated', 'Profile');
  };

}


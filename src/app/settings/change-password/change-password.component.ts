import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FbooknetworkserviceService } from 'src/app/service/fbooknetworkservice.service';
import { FbookserviceService } from 'src/app/service/fbookservice.service';
import { MustMatch } from '../../helpers/must-match.validator';


@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMsg: any;
  succssMsg: any;
  message: string | undefined;
  loggedInUser: any;
  profileUserId: string | null | undefined;
  userDetails: any;

  get f() {
    return this.changePasswordForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private usersService: FbookserviceService,
    private toastService: ToastrService,
    private friendService: FbooknetworkserviceService
  ) { }

  async ngOnInit(): Promise<void> {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });

    this.loggedInUser = this.usersService.getUser();
    this.usersService.saveUser(this.loggedInUser);

    this.profileUserId = localStorage.getItem("profileUserId");
  }

  async onSubmit() {
    this.submitted = true;
    console.log(this.changePasswordForm);
    if (this.changePasswordForm.invalid) {
      return;
    }

    let passwordObject =
    {
      password: this.changePasswordForm.get('newPassword')?.value
    }

    await this.friendService.updateUser(this.profileUserId, passwordObject);
    this.toastService.success('Password has been successfully changed', 'Profile');
  }
}


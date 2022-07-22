import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FbookserviceService } from '../service/fbookservice.service';
import { FbooknetworkserviceService } from '../service/fbooknetworkservice.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup = new FormGroup({});
  submitted = false;
  userlist: any;
  errorMessage: string | undefined;
  successMessage: string | undefined;
  forbiddenEmails: any;

  get f() { return this.forgotPasswordForm.controls; }

  constructor(
    private toastService: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private friendService: FbooknetworkserviceService,
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email], this.forbiddenEmails]
    })
  }

  async onSubmit() {
    this.submitted = true;
    let email =
    {
      email: this.forgotPasswordForm.get('email')?.value
    }
    debugger;
    try {
      let userByEmail: any = await this.friendService.findUserByEmail(email);

      if (userByEmail?.length > 0) {
        localStorage.setItem("tempUserId", userByEmail[0]?._id);
        this.router.navigate(['resetPassword']);
      }
      else {
        this.toastService.error('User with that email does not exist!', 'User non-existant');
      }
    } catch (err) {
      this.toastService.error('User with that email does not exist!', 'User non-existant');
    }
  }
}

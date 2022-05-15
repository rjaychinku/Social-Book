import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../helpers/must-match.validator';
import { FbooknetworkserviceService } from '../service/fbooknetworkservice.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMsg: any;
  succssMsg: any;
  message: string | undefined;

  get f() {
    return this.resetForm.controls;
  }
  constructor(
    private router: Router,
    private toastService: ToastrService,
    private fb: FormBuilder,
    private friendService: FbooknetworkserviceService
  ) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    })
  }

  async onSubmit() {
    this.submitted = true;
    console.log(this.resetForm);
    if (this.resetForm.invalid) {
      return;
    }

    let passwordObject =
    {
      password: this.resetForm.get('newPassword')?.value
    }

    debugger;
    let userId: string | null = localStorage.getItem("tempUserId");
    await this.friendService.updateUser(userId, passwordObject);

    this.toastService.success('Password updated successfully', 'Password');
    localStorage.removeItem("tempUserId");
    this.router.navigate(['login']);

  }
}

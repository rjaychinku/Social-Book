import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from '../models/loginUser';
import { FbookserviceService } from '../service/fbookservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(private toastService: ToastrService, private router: Router, private formBuilder: FormBuilder, private fbookService: FbookserviceService) { }
  userLoggedIn: LoginUser = { email: '', password: '' };

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]]
    });

  }

  get formControls() {
    return this.loginForm.controls;
  }

  async onSubmit(): Promise<void> {

    try {

      this.userLoggedIn.email = this.formControls['email'].value;
      this.userLoggedIn.password = this.formControls['password'].value;
      debugger;
      let result: any = await this.fbookService.login(this.loginForm.value);
      this.router.navigate(['']);
      console.log(result);

    } catch (err: any) {
      this.toastService.error(err, 'Login');
    }
  }

}

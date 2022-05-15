import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FbookserviceService } from '../service/fbookservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({});
  private DATE_FORMAT: string = 'yyyy-MM-dd';

  constructor(private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private router: Router,
    private datePipe: DatePipe,
    private fbookService: FbookserviceService) { }

  ngOnInit(): void {

    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      dob: [this.datePipe.transform(null, this.DATE_FORMAT), [Validators.required]],
      gender: ['', Validators.required],
    });

  }

  async onSubmit(): Promise<void> {

    let message: string = await this.fbookService.register(this.registrationForm.value);
    debugger;
    this.toastService.success("Registration was successful!", 'Registration');
    this.router.navigate(['login']);
  }
}

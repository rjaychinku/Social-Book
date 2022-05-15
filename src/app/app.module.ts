import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NetworkComponent } from './network/network.component';
import { FriendsComponent } from './friends/friends.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FbookserviceService } from './service/fbookservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FbooknetworkserviceService } from './service/fbooknetworkservice.service';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ProfilesectionComponent } from './profilesection/profilesection.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { ProfileSettingsComponent } from './settings/profile-settings/profile-settings.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    NetworkComponent,
    FriendsComponent,
    SettingsComponent,
    UsersComponent,
    HeaderComponent,
    ProfilesectionComponent,
    ChangePasswordComponent,
    ProfileSettingsComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgHttpLoaderModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-full-width'
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    FbookserviceService,
    FbooknetworkserviceService,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

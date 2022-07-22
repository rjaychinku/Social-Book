import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { LoginUser } from '../models/loginUser';
import { RegisterUser } from '../models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class FbookserviceService {

  private BASE_URL = 'https://nodejs-fb-app.herokuapp.com/';
  private loggedInUserSubject: BehaviorSubject<any>;
  public loggedInUser: Observable<any>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.loggedInUserSubject = new BehaviorSubject<any>(null);
    this.loggedInUser = this.loggedInUserSubject.asObservable();
  }

  public get loggedInUserData(): any {
    return this.loggedInUserSubject.value;
  }

  async createPost(post: {}): Promise<string> {
    let result = await lastValueFrom(this.httpClient.post<string>(this.BASE_URL + 'posts/createpost', post));
    return result;
  }

  async getPostsByUserId(userId: string): Promise<any> {
    let result = await lastValueFrom(this.httpClient.post<any>(this.BASE_URL + 'posts/findpostbyuserid', { id: userId }));
    return result;
  }

  async register(registeredUser: RegisterUser): Promise<any> {
    let result = await lastValueFrom(this.httpClient.post<RegisterUser>(this.BASE_URL + 'users/register', registeredUser));
    return result;
  }

  async login(loginUser: LoginUser): Promise<any> {

    let user = await lastValueFrom(this.httpClient.post<LoginUser>(this.BASE_URL + 'users/authenticate', loginUser));
    this.saveUser(user);

    return user;
  }

  logout(): void {
    this.loggedInUserSubject.next(null);
    this.clearLocalStorage();
    this.router.navigate(['login']);
  }

  saveUser(user: any): void {
    this.loggedInUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('tempUserId');
    localStorage.removeItem('profileUserId');
    localStorage.removeItem('user');
  }

  getUser(): any | null {

    if (localStorage.getItem('user') != "[object Object]") {
      let s: any = null;

      s = localStorage.getItem('user');
      return JSON.parse(s);
    }
    return;
  }
}

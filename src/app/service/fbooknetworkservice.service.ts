import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FbooknetworkserviceService {

  private BASE_URL = 'https://nodejs-fb-app.herokuapp.com/';
  public totalConnections: BehaviorSubject<any>;
  public totalConnectionsObservable: Observable<number>;

  public totalPosts: BehaviorSubject<any>;
  public totalPostsObservable: Observable<number>;

  constructor(private httpClient: HttpClient) {
    this.totalConnections = new BehaviorSubject<number>(0);
    this.totalConnectionsObservable = this.totalConnections.asObservable();

    this.totalPosts = new BehaviorSubject<number>(0);
    this.totalPostsObservable = this.totalPosts.asObservable();
  }

  async UpdateProfileData(connections: number, posts: number | null = null): Promise<void> {
    this.totalConnections.next(connections);

    if (posts != null && posts != 0) this.totalPosts.next(posts);
  }

  async getAllRegisteredUsers(): Promise<any> {
    let result = await lastValueFrom(this.httpClient.get<any>(this.BASE_URL + 'users/'));

    return result;
  }

  async getAllFriends(): Promise<any> {
    let result = await lastValueFrom(this.httpClient.get<any>(`${this.BASE_URL} 'friends/'`));
    return result;
  }

  async getFriendsById(loggedInUserId: string): Promise<any> {
    let result = await lastValueFrom(this.httpClient.get<any>(this.BASE_URL + 'friends/?=' + loggedInUserId));
    return result;
  }

  async getUserById(userId: string | null): Promise<{}> {
    let result = await lastValueFrom(this.httpClient.get<any>(this.BASE_URL + 'users/' + userId));
    return result;
  }

  async getPhotoById(photoId: string): Promise<any> {
    let result = await lastValueFrom(this.httpClient.get(this.BASE_URL + 'files/' + photoId, { responseType: "blob" }));
    return result;
  }

  async sendFriendRequest(friendToBe: {}): Promise<string> {
    let result = await lastValueFrom(this.httpClient.post<string>(this.BASE_URL + 'friends/createrequest', friendToBe));
    return result;
  }

  async updateUser(updatedUserId: string | null | undefined, updatedUser: any): Promise<string> {
    let result = await lastValueFrom(this.httpClient.put<string>(this.BASE_URL + 'users/' + updatedUserId, updatedUser));
    return result;
  }

  async findUserByEmail(emailObject: any): Promise<any> {
    let user = await lastValueFrom(this.httpClient.post(this.BASE_URL + 'users/finduserbyemail', emailObject));
    return user;
  }

  async deletePost(postId: string): Promise<any> {
    let user = await lastValueFrom(this.httpClient.delete(this.BASE_URL + 'posts/' + postId));
    return user;
  }

  async getAllPosts(): Promise<any> {
    let user = await lastValueFrom(this.httpClient.get<any>(this.BASE_URL + 'posts/'));
    return user;
  }
}

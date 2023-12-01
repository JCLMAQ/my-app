import { Injectable } from '@angular/core';
import { User } from '@prisma/client';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private userSource = new BehaviorSubject<User[]>([]);

  usersList = this.userSource.asObservable()

  constructor() { }

  changeUserList(usersList: User[]) {
    this.userSource.next(usersList);
  }

}

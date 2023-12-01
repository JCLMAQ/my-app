import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DefaultDataService,
  HttpUrlGenerator
} from '@ngrx/data';
import { User } from '@prisma/client';

@Injectable({ providedIn: 'root' })

export class UserDataService extends DefaultDataService<User> {


    constructor(
      private httpClient :HttpClient,
      httpUrlGenerator: HttpUrlGenerator
      ) {
        super('User', httpClient, httpUrlGenerator);
      }


    // override getAll(): Observable<User[]> {
    //   const result =  this.httpClient.get<User[]>('/api/users/allusers')
    //     .pipe(
    //     map(res => res)
    // );
    // return result
    // }
}

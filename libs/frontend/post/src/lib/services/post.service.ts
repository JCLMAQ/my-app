import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Post } from '@prisma/client';

import { DataService } from '@fe/shared/util-signal-store';
import { Observable, catchError, firstValueFrom, lastValueFrom, throwError } from 'rxjs';
import { PostInterface } from '../store/post.model';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
    // Authorization: 'my-auth-token'
	})
};

export type PostFilter = {
  userId: string;
  companyId: string;
}



@Injectable({
  providedIn: 'root',
})
export class PostService implements DataService<PostInterface, PostFilter> {
  // private readonly http = inject(HttpClient);

  private apiUrl = `api/`;
  // private baseUrl = `${this.apiUrl}posts`; //postswithrelated
  private baseUrl = `${this.apiUrl}postswithrelated`;

  constructor(
    private readonly http: HttpClient)
    { }

  load(filter: PostFilter): Promise<PostInterface[]> {
    return this.findAsPromise(filter.userId, filter.companyId);
  }

  private findAsPromise(userId: string, companyId: string): Promise<PostInterface[]> {
    return firstValueFrom(this.find(userId, companyId));
  }

  private find(
    userId: string,
    companyId: string,
  ): Observable<PostInterface[]> {
    const url = [this.baseUrl, 'post'].join('/');

    const params = new HttpParams().set('userId', userId).set('companyId', companyId);
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<PostInterface[]>(url, { params, headers });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle it accordingly
      console.error('An error occured:', error.error.message);
    } else {
      // The backend returned an unsuccessful respone code.
      // The response body may contain clues as to what was wrong
      console.log(
        `Backend returned code ${error.status}, body was: ${error.status}`
      );
    }
    // return an observable wuth a user-facing error message
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getItemsAsPromise(): Promise<PostInterface[]>{
    return lastValueFrom(this.getItems());
  }

  getItems(): Observable<PostInterface[]> {
    return this.http
      .get<PostInterface[]>(this.baseUrl, httpOptions)
      .pipe(
        catchError(this.handleError));;
  }



  getItem(id: string) {
    return this.http.get<PostInterface>(`${this.baseUrl}/${id}`);
  }

  addItem(value: string) {
    return this.http.post<PostInterface>(this.baseUrl, { value });
  }

  updateItem(value: PostInterface) {
    return this.http.put<PostInterface>(`${this.baseUrl}/${value?.id}`, value);
  }

  deleteItem(value: PostInterface ) {
    return this.http.delete(`${this.baseUrl}/${value?.id}`);
  }
}

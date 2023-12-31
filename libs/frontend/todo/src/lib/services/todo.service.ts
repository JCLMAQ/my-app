import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Todo } from '@prisma/client';

import { DataService } from '@fe/shared/util-common';
import { Observable, catchError, firstValueFrom, lastValueFrom, throwError } from 'rxjs';
import { TodoInterface } from '../store/todo.model';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
    // Authorization: 'my-auth-token'
	})
};

export type TodoFilter = {
  userId: string;
  companyId: string;
}



@Injectable({
  providedIn: 'root',
})
export class TodoService implements DataService<TodoInterface, TodoFilter> {
  // private readonly http = inject(HttpClient);

  private apiUrl = `api/`;
  private baseUrl = `${this.apiUrl}todos`;

  constructor(
    private readonly http: HttpClient)
    { }

  load(filter: TodoFilter): Promise<TodoInterface[]> {
    return this.findAsPromise(filter.userId, filter.companyId);
  }

  private findAsPromise(userId: string, companyId: string): Promise<TodoInterface[]> {
    return firstValueFrom(this.find(userId, companyId));
  }

  private find(
    userId: string,
    companyId: string,
  ): Observable<TodoInterface[]> {
    const url = [this.baseUrl, 'todo'].join('/');

    const params = new HttpParams().set('userId', userId).set('companyId', companyId);
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<TodoInterface[]>(url, { params, headers });
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

  getItemsAsPromise(): Promise<TodoInterface[]>{
    return lastValueFrom(this.getItems());
  }

  getItems(): Observable<TodoInterface[]> {
    return this.http
      .get<TodoInterface[]>(this.baseUrl, httpOptions)
      .pipe(
        catchError(this.handleError));;
  }



  getItem(id: string) {
    return this.http.get<TodoInterface>(`${this.baseUrl}/${id}`);
  }

  addItem(value: string) {
    return this.http.post<TodoInterface>(this.baseUrl, { value });
  }

  updateItem(value: TodoInterface) {
    return this.http.put<TodoInterface>(`${this.baseUrl}/${value?.id}`, value);
  }

  deleteItem(value: TodoInterface ) {
    return this.http.delete(`${this.baseUrl}/${value?.id}`);
  }
}

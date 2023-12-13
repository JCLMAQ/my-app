import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
// import { Todo } from '@prisma/client';

import { Observable, catchError, lastValueFrom, map, throwError } from 'rxjs';
import { TodoInterface } from '../store/todo.model';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
    // Authorization: 'my-auth-token'
	})
};

const apiUrl = `api/`;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);

  private baseUrl = `${apiUrl}todos`;


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



  getItems(): Observable<TodoInterface[]> {
    return this.http
      .get<TodoInterface[]>(this.baseUrl, httpOptions)
      .pipe(
        map((results: any) => results.todos),
        catchError(this.handleError));;
  }

  getItemsAsPromise() {
    return lastValueFrom(this.http.get<TodoInterface[]>(this.baseUrl, httpOptions));
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

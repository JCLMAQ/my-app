import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ICreateUser, IUpdateUser, IUpsertUser, IUser } from '../+state/users.models';

// const httpOptions = {
// 	headers: new HttpHeaders({
// 		'Content-Type': 'application/json',
// 		Authorization: 'my-auth-token'
// 	})
// };

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'api/users'; // URL to web api

  constructor(
    private readonly http: HttpClient)
    { }

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

  getAllUserItems(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(this.baseUrl, httpOptions)
      .pipe(
        map((results: any) => results.users),
        catchError(this.handleError));
  }

  getUserById(userId: string): Observable<IUser> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http
    .get<IUser>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }

  createToDo(userData: ICreateUser): Observable<IUser> {
    return this.http
      .post<IUser>(this.baseUrl, userData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateUser(userId: string, userData: IUpdateUser): Observable<IUser> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http
      .patch<IUser>(url, userData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  createOrUpdateUser(userId: string, userData: IUpsertUser): Observable<IUser> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http
      .put<IUser>(url, userData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteUser(userId: string): Observable<never> {
    const url = `${this.baseUrl}/${userId}`; // DELETE api/users/42-5c-...
    return this.http
      .delete<never>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // public create(user: User): Observable<User> {
	// 	return this.http
	// 		.post<User>(this.baseUrl, user, httpOptions)
	// 		.pipe(catchError(this.handleError));
	// }

  // public findAll(): Observable<User[]> {
	// 	return this.http.get<User[]>(this.baseUrl, httpOptions).pipe(
	// 		map((results: any) => results.users),
	// 		catchError(this.handleError)
	// 	);
	// }

  // public delete(id: string): Observable<object> {
	// 	const url = `${this.baseUrl}/${id}`; // DELETE api/users/42-5c-...
	// 	return this.http
	// 		.delete(url, httpOptions)
	// 		.pipe(catchError(this.handleError));
	// }
}
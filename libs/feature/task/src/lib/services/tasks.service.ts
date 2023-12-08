
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { TaskInterface } from "../+state/tasks.models";




const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
    // Authorization: 'my-auth-token'
	})
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseUrl = 'api/tasks'; // URL to web api

  constructor(
    private readonly http: HttpClient)
    { }


    // getTasks(): Observable<TaskInterface[]> {
    //     const tasks = [
    //       { id: '1', title: 'First Task'},
    //       { id: '2', title: 'Second Task'},
    //       { id: '3', title: 'Third Task'},
    //     ];
    //     return of(tasks).pipe(delay(2000))
    // }
    getTasks(): Observable<TaskInterface[]> {
       return this.http.get<TaskInterface[]>(this.baseUrl, httpOptions)
      //  .pipe(

      //   catchError(this.handleError)
      //  )
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

  getAllTaskItems(): Observable<TaskInterface[]> {
    return this.http
      .get<TaskInterface[]>(this.baseUrl, httpOptions)
      .pipe(
        map((results: any) => results.tasks),
        catchError(this.handleError));
  }

  getTaskById(taskId: string): Observable<TaskInterface> {
    const url = `${this.baseUrl}/${taskId}`;
    return this.http
    .get<TaskInterface>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }

  createTask(userData: TaskInterface): Observable<TaskInterface> {
    return this.http
      .post<TaskInterface>(this.baseUrl, userData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateTask(taskId: string, taskData: TaskInterface): Observable<TaskInterface> {
    const url = `${this.baseUrl}/${taskId}`;
    return this.http
      .patch<TaskInterface>(url, taskData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  createOrUpdateTask(taskId: string, taskData: TaskInterface): Observable<TaskInterface> {
    const url = `${this.baseUrl}/${taskId}`;
    return this.http
      .put<TaskInterface>(url, taskData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteTask(taskId: string): Observable<never> {
    const url = `${this.baseUrl}/${taskId}`; // DELETE api/tasks/42-5c-...
    return this.http
      .delete<never>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }
}

  // public create(user: User): Observable<User> {
	// 	return this.http
	// 		.post<User>(this.baseUrl, user, httpOptions)
	// 		.pipe(catchError(this.handleError));
	// }

  // public findAll(): Observable<User[]> {
	// 	return this.http.get<User[]>(this.baseUrl, httpOptions).pipe(
	// 		map((results: any) => results.tasks),
	// 		catchError(this.handleError)
	// 	);
	// }

  // public delete(id: string): Observable<object> {
	// 	const url = `${this.baseUrl}/${id}`; // DELETE api/tasks/42-5c-...
	// 	return this.http
	// 		.delete(url, httpOptions)
	// 		.pipe(catchError(this.handleError));
	// }

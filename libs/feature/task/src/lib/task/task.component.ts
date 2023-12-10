import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { delay } from 'rxjs';
import * as TasksActions from '../+state/tasks.actions';
import { tasksFeature } from '../+state/tasks.state';

@Component({
  selector: 'lib-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit{//

  private readonly store = inject(Store);

  readonly tasks$ = this.store.select(tasksFeature.selectAll);
  readonly istaskSelected$ = this.store.select(tasksFeature.selectIsTaskSelected);
  readonly selectedtask$ = this.store.select(tasksFeature.selectSelectedTask);
  readonly loaded$ = this.store.select(tasksFeature.selectLoaded)
  readonly isLoading$ = this.store.pipe(delay(1500), select(tasksFeature.selectIsLoading) );
  readonly error$ = this.store.pipe(select(tasksFeature.selectError));

  ngOnInit(): void {
    this.store.dispatch(TasksActions.tasksPageActions.load()) ;
  }



}

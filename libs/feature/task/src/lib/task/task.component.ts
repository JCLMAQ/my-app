import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'apps/frontend/src/app/appState.interface';
import { Observable } from 'rxjs';
import * as TasksActions from '../+state/tasks.actions';
import { TaskInterface } from '../+state/tasks.models';
import { errorSelector, isLoadingSelector, tasksSelector } from '../+state/tasks.selectors';

@Component({
  selector: 'lib-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null> | undefined;
  tasks$: Observable<TaskInterface[]> | undefined;

  constructor( private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.tasks$ = this.store.pipe(select(tasksSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(TasksActions.getTasks()) ;
  }



}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'apps/frontend/src/app/appState.interface';
import { Observable } from 'rxjs';
import * as TasksActions from '../+state/tasks.actions';
import { isLoadingSelector } from '../+state/tasks.selectors';

@Component({
  selector: 'lib-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  isLoading$: Observable<boolean>;
  constructor( private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(TasksActions.getTasks()) ;
  }



}

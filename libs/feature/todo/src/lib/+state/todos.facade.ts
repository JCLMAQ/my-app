import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as TodosActions from './todos.actions';
import * as TodosFeature from './todos.reducer';
import * as TodosSelectors from './todos.selectors';

@Injectable()
export class TodosFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(TodosSelectors.selectTodosLoaded));
  allTodos$ = this.store.pipe(select(TodosSelectors.selectAllTodos));
  selectedTodos$ = this.store.pipe(select(TodosSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(TodosActions.initTodos());
  }
}

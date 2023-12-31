import { withCallState } from '@fe/shared/util-common';
import { signalStore, type, withHooks, withState } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { TodoService } from '../services/todo.service';
import { withTodosMethods } from './todo.methods';
import { TodoInterface } from './todo.model';
import { withTodosSelectors } from './todo.selectors';
// import { withUndoRedo } from '@fe/shared/undo-redo';
import { withDataService } from '@fe/shared/util-common';

export interface TodoStateInterface {
  items: TodoInterface[];
}

export const initialTodoState: TodoStateInterface = {
  items: [],
};


// Base on: https://offering.solutions/blog/articles/2023/12/03/ngrx-signal-store-getting-started/
// and also on: https://www.angulararchitects.io/blog/the-new-ngrx-signal-store-for-angular-2-1-flavors/

export const TodoStore = signalStore(
    { providedIn: 'root' },

    withCallState({collection: 'todo'}),
    withEntities( {entity: type<TodoInterface>(), collection: 'todo'}),
    // withEntities<TodoInterface>(),
    withState(initialTodoState),
    withTodosMethods(),
    withTodosSelectors(),
    withDataService({
      dataServiceType: TodoService,
      filter: { },
      collection: 'todo'
    }),
    // withUndoRedo({
    //   collections: ['todo'],
    // }),
    withHooks({
      // async onInit({ loadAllTodosByPromise }) {
      //   console.log('Store hoocks: just before data Fetching.');
      //   await loadAllTodosByPromise();
      //   console.log('Store hoocks: just after data Fetching');
      // },
      onInit: (store) => store.loadAllTodosByPromise(),
      onDestroy() {
        console.log('on destroy');
      },
    }),
  );



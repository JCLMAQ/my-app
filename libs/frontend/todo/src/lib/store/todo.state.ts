import { signalStore, type, withHooks, withState } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { withTodosMethods } from './todo.methods';
import { TodoInterface } from './todo.model';
import { withTodosSelectors } from './todo.selectors';
// import { withUndoRedo } from '@fe/shared/undo-redo';
import { withCallState } from '@fe/shared/util-common';

export interface TodoStateInterface {
  items: TodoInterface[];
  isLoading: boolean;
  loaded: boolean;
  error: string | null;

}

export const initialTodoState: TodoStateInterface = {
  items: [],
  isLoading: false,
  loaded: false,
  error: null
};

/*
Base on: https://offering.solutions/blog/articles/2023/12/03/ngrx-signal-store-getting-started/
*/
// With Promises methods
export const TodoStore = signalStore(
    { providedIn: 'root' },
    withEntities({ entity: type<TodoInterface>, collection: 'todo'}),
    withState(initialTodoState),
    withTodosMethods(),
    withTodosSelectors(),
    withHooks({
      onInit({ loadAllTodosByPromise }) {
        console.log('on init');
        loadAllTodosByPromise();
      },
      // onInit({ loadAllTodos }) { // The same but with RxJS methods
        //       console.log('on init');
        //       loadAllTodos();
        //     },
      onDestroy() {
        console.log('on destroy');
      },
    }),

    withCallState()

  );



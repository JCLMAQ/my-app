import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withTodosMethods } from './todo.methods';
import { TodoInterface } from './todo.model';
import { withTodosSelectors } from './todo.selectors';

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
// export const TodoStore = signalStore(
//     { providedIn: 'root' },
//     withState(initialTodoState),
//     withTodosSelectors(),
//     withTodosMethods(),
//     withHooks({
//       onInit({ loadAllTodosByPromise }) {
//         console.log('on init');
//         loadAllTodosByPromise();
//       },
//       onDestroy() {
//         console.log('on destroy');
//       },
//     })
//   );

// The same but with RxJS methods
export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialTodoState),
  withTodosSelectors(),
  withTodosMethods(),
  withHooks({
    onInit({ loadAllTodos }) {
      console.log('on init');
      loadAllTodos();
    },
    onDestroy() {
      console.log('on destroy');
    },
  })
);

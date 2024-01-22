
// import { withCallState } from '@angular-architects/ngrx-toolkit';
import { SelectionModel } from '@angular/cdk/collections';
import { withCallState, withLogger } from '@fe/shared/util-signal-store';
import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withTodosMethods } from './todo.methods';
import { TodoInterface } from './todo.model';

export interface TodoStateInterface {
  items: TodoInterface[],
  filter: {
    ownerId: string | null
    orgId: string | null,
  },
  selectedId: string | null,
  selectedIds: string [],
  selection: SelectionModel<TodoInterface>

}

export const initialTodoState: TodoStateInterface = {
  items: [],
  filter: {
    ownerId: "test",
    orgId: "test"
  },
  selectedId: "",
  selectedIds: [],
  selection: new SelectionModel<TodoInterface>(true, [])

};

// Base on: https://offering.solutions/blog/articles/2023/12/03/ngrx-signal-store-getting-started/
// and also on: https://www.angulararchitects.io/blog/the-new-ngrx-signal-store-for-angular-2-1-flavors/
// and : https://www.angulararchitects.io/blog/smarter-not-harder-simplifying-your-application-with-ngrx-signal-store-and-custom-features/

export const TodoStore = signalStore(
    { providedIn: 'root' },

    withCallState({collection: 'todo'}),
    // withEntities( {entity: type<TodoInterface>(), collection: 'todo'}),
    // withSelectedEntity(),
    withLogger('todo'),
    // withComputed(({ postEntities }) => ({
    //   selected: computed(() => postEntities().filter((f) => )),
    // })),
    withState(initialTodoState),
    withTodosMethods(),
    // withTodosSelectors(),
    // withDataService({
    //   dataServiceType: TodoService,
    //   filter: { ownerId: "", orgId: "" },
    //   collection: 'todo'
    // }),

    withHooks({
      onInit: (store) => store.load(),
      onDestroy() {
        console.log('on destroy');
      },
    }),

  );



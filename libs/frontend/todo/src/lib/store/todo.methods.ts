import { inject } from '@angular/core';
import { setLoaded, setLoading, withCallState, withUndoRedo } from '@fe/shared/util-signal-store';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
  withState,
} from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { TodoService } from '../services/todo.service';
import { TodoInterface } from './todo.model';
import { TodoStateInterface, initialTodoState } from './todo.state';
// withCallState base on: https://www.angulararchitects.io/blog/the-new-ngrx-signal-store-for-angular-2-1-flavors/

export function withTodosMethods() {
  return signalStoreFeature(
    { state: type<TodoStateInterface>() },
    withCallState(),
    withState(initialTodoState),
    withUndoRedo(),
    withEntities({ entity: type<TodoInterface>(), collection: 'todo'}),

    withMethods((store, todoService = inject(TodoService)) => ({
      async load() {
        patchState(store, setLoading());
        const items = await todoService.load();
        console.log("Items just fetched : ", items)
        patchState(store, { items },setLoaded());
        console.log("Items Loaded in the store: ", store)
        patchState(store, setAllEntities(items, { collection: 'todo'}))
      },

      async add(data: {
        content: string | undefined | null;
        title: string| undefined | null;
        ownerId: string;
        orgId: string }) {
      patchState(store, setLoading());
      const todo = await todoService.addItem(data);
      patchState(store, addEntity( todo, { collection: 'todo'}));
      patchState(store, setLoaded());
    },

    async remove(id: string) {
      patchState(store, setLoading());
      await todoService.deleteItem(id);
      patchState(store, removeEntity( id, { collection: 'todo'}));
      patchState(store, setLoaded());
    },

    async update(id: string, data: TodoInterface) {
      patchState(store, setLoading());
      await todoService.updateItem(data);
      const changes = { title: data.title , content: data.content }
      patchState(store, updateEntity({ id, changes }, { collection: 'todo'}));
      patchState(store, setLoaded());
    },

    })),

  )
}

import { inject } from '@angular/core';
import { setLoaded, setLoading, withCallState, withUndoRedo } from '@fe/shared/util-signal-store';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
  withState
} from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { TodoService } from '../services/todo.service';
import { TodoInterface } from './todo.model';
import { TodoStateInterface, initialTodoState } from './todo.state';
// withCallState base on: https://www.angulararchitects.io/blog/the-new-ngrx-signal-store-for-angular-2-1-flavors/

export function withTodosMethods() {
  return signalStoreFeature(
    { state: type<TodoStateInterface>() },
    withState(initialTodoState),
    withEntities({ entity: type<TodoInterface>(), collection: 'todo'}),
    withCallState({collection: 'todo'}),
    withMethods((store, todoService = inject(TodoService)) => ({

      async load() {
        if (!store.todoLoaded()) {
          patchState(store, setLoading('todo'));
          const items = await todoService.load();
          patchState(store, { items },setLoaded('todo'));
          patchState(store, setAllEntities( items, { collection: 'todo'}))
        }
      },

      async add(data: {
        content: string | undefined | null;
        title: string| undefined | null;
        ownerId: string;
        orgId: string }) {
        patchState(store, setLoading('todo'));
        const todo = await todoService.addItem(data);
        patchState(store, addEntity( todo, { collection: 'todo'}));
        patchState(store, setLoaded('todo'));
      },

      async remove(id: string) {
        patchState(store, setLoading('todo'));
        await todoService.deleteItem(id);
        patchState(store, removeEntity( id, { collection: 'todo'}));
        patchState(store, setLoaded('todo'));
      },

      async update(id: string, data: TodoInterface) {
        patchState(store, setLoading('todo'));
        await todoService.updateItem(data);
        const changes = { title: data.title , content: data.content }
        patchState(store, updateEntity({ id, changes }, { collection: 'todo'}));
        patchState(store, setLoaded('todo'));
      },

      toggleSelected( selectedRowId: string) {
        const allSelectedRowId = store.selectedRowIds();
        const existSelectedRowId = allSelectedRowId.filter( item => item === selectedRowId)
        if(existSelectedRowId.length === 0) {
          patchState(store, { selectedRowIds: [ ...store.selectedRowIds(), selectedRowId] })
          patchState(store, { selectedId: selectedRowId })
        } else {
          const updateSelectedRowId = allSelectedRowId.filter( item => item !== selectedRowId)
          patchState(store, { selectedRowIds: updateSelectedRowId })
          patchState(store, { selectedId: "" })
        }
      },

      newSelectedItem(newSelectedItemIndex: number) {
        const selectedId = store.selectedRowIds()[newSelectedItemIndex]
        patchState(store,{ selectedId })
      },

      selectedItemUpdate(selectedId){
        const allSelectedRowId = store.selectedRowIds();
        const existSelectedRowId = allSelectedRowId.filter( item => item === selectedId)
        if(!existSelectedRowId) {
          patchState(store, { selectedRowIds: [ ...store.selectedRowIds(), selectedId] })
        };
        patchState(store,{ selectedId })
      }

    })),
    withUndoRedo({
      collections: ['todo'],
    }),
  )
}

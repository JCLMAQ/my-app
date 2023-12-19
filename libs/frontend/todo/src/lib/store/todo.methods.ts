import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { TodoInterface } from './todo.model';
import { TodoStateInterface } from './todo.state';

export function withTodosMethods() {
  return signalStoreFeature(
    { state: type<TodoStateInterface>() },
    withMethods((store, todoService = inject(TodoService)) => ({
      // Load Todo with rxjs
      loadAllTodos: rxMethod<void>(
        pipe(
          switchMap(() => {
            patchState(store, { isLoading: true, loaded: false });
            return todoService.getItems().pipe(
              tapResponse({
                next: (items: any) => patchState(store, { items }),
                error: console.error,
                finalize: () => patchState(store, { isLoading: false, loaded: true }),
              })
            );
          })
        )
      ),
      // Load Todo by Promise
      async loadAllTodosByPromise() {
        patchState(store, { isLoading: true, loaded: false });

        const items = await todoService.getItemsAsPromise();

        patchState(store, { items, isLoading: false, loaded: true });
      },
      // Add todo (rxjs)
      addTodo: rxMethod<string>(
        pipe(
          switchMap((value) => {
            patchState(store, { isLoading: true, loaded: false });

            return todoService.addItem(value).pipe(
              tapResponse({
                next: (item) =>
                  patchState(store, { items: [...store.items(), item] }),
                error: console.error,
                finalize: () => patchState(store, { isLoading: false, loaded: true }),
              })
            );
          })
        )
      ),

      // Todo state to "done"
      // moveToDone: rxMethod<TodoInterface>(
      //   pipe(
      //     switchMap((todo) => {
      //       patchState(store, { isLoading: true, loaded: false});

      //       const toSend = { ...todo, todoState: 'DONE' };

      //       return todoService.updateItem(toSend).pipe(
      //         tapResponse({
      //           next: (updatedTodo) => {
      //             const allItems = [...store.items()];
      //             const index = allItems.findIndex((x) => x.id === todo.id);

      //             allItems[index] = updatedTodo;

      //             patchState(store, {
      //               items: allItems,
      //             });
      //           },
      //           error: console.error,
      //           finalize: () => patchState(store, { isLoading: false, loaded: true }),
      //         })
      //       );
      //     })
      //   )
      // ),

      /* Example:
          addPost(title: string) {
      const newPost: PostInterface = {
        id: crypto.randomUUID(),
        title,
      };
      const updatedPosts = [...store.posts(), newPost];
      patchState(store, { posts: updatedPosts });
    },
    removePost(id: string) {
      const updatedPosts = store.posts().filter((post) => post.id !== id);
      patchState(store, { posts: updatedPosts });
    },
    addPosts(posts: PostInterface[]) {
      patchState(store, { posts });
    },
      */

      deleteTodo: rxMethod<TodoInterface>(
        pipe(
          switchMap((todo) => {
            patchState(store, { isLoading: true, loaded: false });

            return todoService.deleteItem(todo).pipe(
              tapResponse({
                next: () => {
                  patchState(store, {
                    items: [...store.items().filter((x) => x.id !== todo.id)],
                  });
                },
                error: console.error,
                finalize: () => patchState(store, { isLoading: false, loaded: true}),
              })
            );
          })
        )
      ),
    }))
  );
}

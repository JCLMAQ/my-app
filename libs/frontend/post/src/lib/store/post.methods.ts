import { inject } from '@angular/core';
import { setLoaded, setLoading, withCallState } from '@fe/shared/util-signal-store';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { PostService } from '../services/post.service';
import { PostInterface } from './post.model';
import { PostStateInterface } from './post.state';

// withCallState base on: https://www.angulararchitects.io/blog/the-new-ngrx-signal-store-for-angular-2-1-flavors/

export function withPostsMethods() {
  return signalStoreFeature(
    { state: type<PostStateInterface>() },
    withCallState(),
    // withEntities<PostInterface>(),
    withEntities({ entity: type<PostInterface>(), collection: 'post'}),
    withMethods((store, postService = inject(PostService)) => ({
      // Load Post with rxjs
      loadAllPosts: rxMethod<void>(
        pipe(
          switchMap(() => {
            patchState(store, setLoading());
            return postService.getItems().pipe(
              tapResponse({
                next: (items: any) => patchState(store, { items }),
                error: console.error,
                finalize: () => patchState(store, setLoaded()),
              })
            );
          })
        )
      ),
      // Load Post by Promise
      async loadAllPostsByPromise() {
        patchState(store, setLoading());
        const items = await postService.getItemsAsPromise();
        console.log("Items just fetched : ", items)
        patchState(store, { items },setLoaded());
        console.log("Items Loaded in the store: ", store)
        patchState(store, setAllEntities(items, { collection: 'post'}))
      },
      // Add post (rxjs)
      addPost: rxMethod<string>(
        pipe(
          switchMap((value) => {
            patchState(store, setLoading( ));
            return postService.addItem(value).pipe(
              tapResponse({
                next: (item) =>
                  patchState(store, { items: [...store.items(), item] }),
                error: console.error,
                finalize: () => patchState(store, setLoaded()),
              })
            );
          })
        )
      ),
      deletePost: rxMethod<PostInterface>(
        pipe(
          switchMap((post) => {
            patchState(store, setLoading());
            return postService.deleteItem(post).pipe(
              tapResponse({
                next: () => {
                  patchState(store, {
                    items: [...store.items().filter((x) => x.id !== post.id)],
                  });
                },
                error: console.error,
                finalize: () => patchState(store, setLoaded() ),
              })
            );
          })
        )
      ),

      // Example: Post state to "done"
      // moveToDone: rxMethod<PostInterface>(
      //   pipe(
      //     switchMap((post) => {
      //       patchState(store, { isLoading: true, loaded: false});

      //       const toSend = { ...post, postState: 'DONE' };

      //       return postService.updateItem(toSend).pipe(
      //         tapResponse({
      //           next: (updatedPost) => {
      //             const allItems = [...store.items()];
      //             const index = allItems.findIndex((x) => x.id === post.id);

      //             allItems[index] = updatedPost;

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


    })),

  );
}

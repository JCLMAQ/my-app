import { inject } from '@angular/core';
import { setLoaded, setLoading, withCallState } from '@fe/shared/util-signal-store';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
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
    withEntities({ entity: type<PostInterface>(), collection: 'post'}),
    withMethods((store, postService = inject(PostService)) => ({
      // async load() {
      //   const posts = await postService.findAll();
      //   patchState(store, setAllEntities(posts));
      // },

      // async add(data: PostPartialInterface) {
      //   const post = await postService.add(data);
      //   patchState(store, addEntity(post));
      // },

      // async remove(id: string) {
      //   await postService.remove(id);
      //   patchState(store, removePostEntity(id));
      // },

      // async update(id: string, data: PostPartialInterface) {
      //   await postService.update(id, data);
      //   patchState(store, updatePostEntity({ id, changes: { data } }));
      // },

      // Load Posts by Promise
      async loadAllPosts() {
        patchState(store, setLoading());
        const items = await postService.getItems();
        console.log("Items just fetched : ", items)
        patchState(store, setLoaded());
        // patchState(store, { items },setLoaded());
        console.log("Items Loaded in the store: ", store)
        patchState(store, setAllEntities(items, { collection: 'post'}))
      },
      // Add Post By Promise
      async addPost(value) {
        console.log("AddPost value: ", value)
        patchState(store, setLoading( ));
        const createdItem = await postService.addItem(value);
        console.log("Post created: ",createdItem);
        patchState(store, { items: [...store.items(), createdItem] })
        patchState(store, setLoaded())
      },
      // Update Post By Promise
      async updatePost(data){
        console.log("UpdatePost value: ", data)
        patchState(store, setLoading( ));
        const updatedItem = await postService.updateItem(data);
        console.log("Post Updated: ",updatedItem);
        patchState(store, updateEntity( id: updatedItem.id, change: updatedItem))
      },
      // Delete Post by Promise
      async deletePost(postToDelete: PostInterface) {
        patchState(store, setLoading());
        await postService.deleteItem(postToDelete);
        patchState(store, {
          items: [...store.items().filter((x) => x.id !== postToDelete.id)],
        });
        patchState(store, removeEntity(postToDelete.id))
        patchState(store, setLoaded());
      },


      // Load Post with rxjs
      loadAllPostsrxjs: rxMethod<void>(
        pipe(
          switchMap(() => {
            patchState(store, setLoading());
            return postService.getItemsrxjs().pipe(
              tapResponse({
                next: (items: PostInterface[] ) => patchState(store, { items }),
                error: console.error,
                finalize: () => patchState(store, setLoaded()),
              })
            );
          })
        )
      ),

      // Add post (rxjs)
      addPostrxjs: rxMethod(
        pipe(
          switchMap((value) => {
            patchState(store, setLoading( ));
            return postService.addItemrxjs(value).pipe(
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

      // Delete Post rxjs
      deletePostrxjs: rxMethod<PostInterface>(
        pipe(
          switchMap((post) => {
            patchState(store, setLoading());
            return postService.deleteItemrxjs(post).pipe(
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
    })),
  );
}

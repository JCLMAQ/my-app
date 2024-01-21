import { inject } from '@angular/core';
import { setLoaded, setLoading, withCallState } from '@fe/shared/util-signal-store';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods
} from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { PostService } from '../services/post.service';
import { PostInterface } from './post.interface';

// import { PostStateInterface } from './post.state';

// withCallState base on: https://www.angulararchitects.io/blog/the-new-ngrx-signal-store-for-angular-2-1-flavors/

export function withPostsMethods() {
  return signalStoreFeature(
    // { state: type<PostStateInterface>() },
    withCallState(),
    withEntities({ entity: type<PostInterface>(), collection: 'post'}),
    withMethods((store, postService = inject(PostService)) => ({

      async load() {
        patchState(store, setLoading());
        const posts = await postService.load();
        patchState(store, setAllEntities(posts, { collection: 'post'}));
        console.log("getItems for Store: ", posts)
        patchState(store, setLoaded());
      },

      async add(data: {
          content: string | undefined | null;
          title: string| undefined | null;
          ownerId: string;
          orgId: string }) {
        patchState(store, setLoading());
        const post = await postService.addItem(data);
        patchState(store, addEntity( post, { collection: 'post'}));
        patchState(store, setLoaded());
      },

      async remove(id: string) {
        patchState(store, setLoading());
        await postService.deleteItem(id);
        patchState(store, removeEntity( id, { collection: 'post'}));
        patchState(store, setLoaded());
      },

      async update(id: string, data: PostInterface) {
        patchState(store, setLoading());
        await postService.updateItem(data);
        const changes = { title: data.title , content: data.content }
        patchState(store, updateEntity({ id, changes }, { collection: 'post'}));
        patchState(store, setLoaded());
      },
    })),
  );
}

import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { effect } from "@angular/core";
import { withCallState, withDataService, withLogger, withUndoRedo } from "@fe/shared/util-signal-store";
import { signalStore, type, withHooks, withState } from "@ngrx/signals";
import { withEntities } from "@ngrx/signals/entities";
import { PostService } from "../services/post.service";
import { PostInterface } from "./post.interface";
import { withPostsMethods } from "./post.methods";

export interface PostStateInterface {
  // items: PostInterface[];
  // selectedEntityId: string | null
}

export const initialPostState: PostStateInterface = {
  // items: [],
  // selectedEntityId: null
};

// export type SelectedEntityState = { selectedEntityId: EntityId | null };

export const PostStore = signalStore(
  { providedIn: 'root' },
  withState(initialPostState),
  withDevtools('post'),
  withCallState({collection: 'post'}),
  withEntities( {entity: type<PostInterface>(), collection: 'post'}),
  // withSelectedEntity(),
  withLogger('post'),
  withPostsMethods(),
  withDataService({
    dataServiceType: PostService,
    filter: { },
    collection: 'post'
  }),

  withUndoRedo({
    collections: ['post'],
  }),

  withHooks({
    onInit: (store) => {
      store.load(),
      effect(() => {
        console.log('postEntityMap', store.postEntityMap())
        console.log('postIds', store.postIds())
        console.log('postEntities', store.postEntities())
      });
    },
    onDestroy() {
      console.log('on destroy post store');
    },

  }),

);

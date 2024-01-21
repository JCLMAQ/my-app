import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { effect } from "@angular/core";
import { withCallState, withDataService, withLogger, withUndoRedo } from "@fe/shared/util-signal-store";
import { signalStore, type, withHooks, withState } from "@ngrx/signals";
import { withEntities } from "@ngrx/signals/entities";
import { PostService } from "../services/post.service";
import { PostInterface } from "./post.interface";
import { withPostsMethods } from "./post.methods";

export interface PostStateInterface {
  items: PostInterface[],
  filter: {
    ownerId: string,
    orgId: string
  },
  // selectedEntityId: string | null
}

export const initialPostState: PostStateInterface = {
  items: [],
  filter: {
    ownerId: "b64d3148-b2b2-4d7d-8c3e-cde4673f9665",
    orgId: "f52e6086-5d1b-4c2b-a6a1-86513c30ac34"
  },
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

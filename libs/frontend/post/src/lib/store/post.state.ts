import { computed } from "@angular/core";
import { withCallState, withLogger, } from "@fe/shared/util-signal-store";
import { signalStore, type, withComputed, withHooks, withState } from "@ngrx/signals";
import { withEntities } from "@ngrx/signals/entities";
import { withPostsMethods } from "./post.methods";
import { PostInterface } from "./post.model";

export interface PostStateInterface {
  items: PostInterface[];
}

export const initialPostState: PostStateInterface = {
  items: [],
};

export const PostStore = signalStore(
  { providedIn: 'root' },
  withState(initialPostState),
  withCallState({collection: 'post'}),
  withComputed((postStore) => ({
    postsCount: computed(() => postStore.items().length),
  })),
  withEntities( {entity: type<PostInterface>(), collection: 'post'}),
//  withSelectedEntity(),
  withPostsMethods(),
  withLogger('post'),
  withHooks({
    onInit: (store) => store.loadAllPostsByPromise(),
    onDestroy() {
      console.log('on destroy');
    },

  }),
);

import { withCallState, withLogger, } from "@fe/shared/util-signal-store";
import { signalStore, type, withHooks, withState } from "@ngrx/signals";
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

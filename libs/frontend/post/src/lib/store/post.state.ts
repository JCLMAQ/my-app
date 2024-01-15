import { withCallState } from "@fe/shared/util-signal-store";
import { signalStore, type, withHooks } from "@ngrx/signals";
import { withEntities } from "@ngrx/signals/entities";
import { PostInterface } from "./post.interface";
import { withPostsMethods } from "./post.methods";

export interface PostStateInterface {
  // items: PostInterface[];
}

export const initialPostState: PostStateInterface = {
  // items: [],
};

export const PostStore = signalStore(
  { providedIn: 'root' },
  // withState(initialPostState),
  withCallState({collection: 'post'}),
  withEntities( {entity: type<PostInterface>(), collection: 'post'}),
  withPostsMethods(),
//  withSelectedEntity(),

  withHooks({
    onInit: (store) => store.load(),
    onDestroy() {
      console.log('on destroy');
    },

  }),
);

import { createFeature, createReducer, on } from "@ngrx/store";
import { User } from "@prisma/client";
import { usersAPIActions, usersPageActions } from "./users.actions";


export const usersFeatureKey = 'usersFeature';
interface State {
  users: User[];
  loading: boolean;
  selectedUserId: string;
  loaded: boolean;
}

const initialState: State = {
  users: [],
  loading: false,
  selectedUserId: "",
  loaded: false
};

const reducer = createReducer(
  initialState,
    on(usersAPIActions.loadUsersSuccess, (state) => ({
      ...state,
      loading: true,
      loaded: true,
    })),
    on(usersAPIActions.loadUsersFailure, (state) => ({
      ...state,
      loading: false,
      loaded: false,
    })),
    on(usersPageActions.load, (state) => ({
      ...state,
      loading: false,
    }))
  ),
);

export const usersFeature = createFeature({
  name: 'usersFeatureKey',
  reducer
});

// export const {
//   name, // feature name
//   reducer, // feature reducer
//   selectUsersState, // feature selector
//   selectUsers, // selector for `books` property
//   selectLoading, // selector for `loading` property
// } = usersFeature;

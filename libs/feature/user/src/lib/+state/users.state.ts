import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { usersAPIActions, usersPageActions } from "./users.actions";
import { IUser } from "./users.models";

export interface UserStateInterface extends EntityState <IUser>{
  // users: IUser[];
  isLoading: boolean;
  selectedUserId: string | null;
  loaded: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

export const initialState: UserStateInterface= adapter.getInitialState({
  // users: [],
  isLoading: false,
  selectedUserId: null,
  loaded: false,
  error: null
});

/// Reducer
const reducer = createReducer(
  initialState,
  on(usersPageActions.load, (state: any) => ({ ...state, isLoading: true })),
  on(usersPageActions.select, (state: any, { id }: any) => ({
    ...state,
    selectedId: id,
  })),
  on(usersPageActions.addUser, (state, { user }) =>
  adapter.addOne(user, state)
  ),
  on(usersPageActions.selectUser, (state, { userId }) => ({
    ...state,
    selectedUserId: userId,
  })),
  on(usersAPIActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    isLoading: false,
    loaded: true,
  })),
  on(usersAPIActions.loadUsersFailure, (state) => ({
    ...state,
    isLoading: false,
    loaded: false,
  })),

)

// Create Feature
export const usersFeature = createFeature({
  name: 'users',
  reducer,
  extraSelectors: ({ selectSelectedUserId, selectUsersState, selectEntities }) => ({
    selectSelectedUserBis: createSelector(
    selectSelectedUserId,
    // selectUsers,
    (selectedUserId: any, users: any[]) => users.find((s) => s.id === selectedUserId),
    ),
    ...adapter.getSelectors(selectUsersState),
    selectIsUserSelected: createSelector(
      selectSelectedUserId,
      (selectedId) => selectedId !== null
    ),
    selectSelectedUser: createSelector(
      selectSelectedUserId,
      selectEntities,
      (selectedId, entities) => selectedId ? entities[selectedId] : null
    ),
  })
})

export const {
  name: usersFeatureKey,
  reducer: usersReducer,
  selectError,
  selectEntities,
  selectIsLoading,
  selectLoaded,
  selectSelectedUserId
} = usersFeature;

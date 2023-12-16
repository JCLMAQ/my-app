import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { usersAPIActions, usersPageActions } from "./users.actions";
import { UserInterface } from "./users.models";


// export const USERS_FEATURE_KEY = 'users';


export interface UsersStateInterface extends EntityState<UserInterface>{
  isLoading: boolean;
  error: string | null;
  loaded: boolean;
  selectedUserId: string | undefined | null;
}

export const usersAdapter: EntityAdapter<UserInterface> = createEntityAdapter<UserInterface>();


export const initialUsersState: UsersStateInterface = usersAdapter.getInitialState ({
  isLoading: false,
  loaded: false,
  error: null,
  selectedUserId: null,
});

const reducer = createReducer(
  initialUsersState,
  // Page Actions
  on(usersPageActions.load,(state) => ({
    ...state,
    isLoading: true,
    loaded: false,
    error: null,
  }) ),
  on(usersPageActions.init, (state) => ({
    ...state,
    isLoading: false,
    loaded: false,
    error: null,
  })),
  on(usersPageActions.selectUser, (state, action) => ({
    ...state,
    selectedUserId: action.userId,
  })),
  on(usersPageActions.addUser, (state, { user }) =>
  usersAdapter.addOne(user, state)
),
  // API Actions
  on(usersAPIActions.loadUsersSuccess,(state , action) => {
    return usersAdapter.addMany(action.users,{ ...state,isLoading: false,loaded: true, });
  } ),
  on(usersAPIActions.loadUsersFailure,(state, action) => ({
    ...state,
    isLoading: false,
    loaded: false,
    error: action.error,
  }) ),
)

// Create Feature
export const usersFeature = createFeature({
  name: 'usersFeature',
  reducer: reducer,
  extraSelectors: ({
    selectSelectedUserId,
    selectUsersFeatureState,
    selectEntities}) => ({
      ...usersAdapter.getSelectors(selectUsersFeatureState),
      selectIsUserSelected: createSelector(
        selectSelectedUserId,
        (selectedId) => selectedId !== null
      ),
      selectSelectedUser: createSelector(
        selectSelectedUserId,
        selectEntities,
        (selectedId, entities) => selectedId ? entities[selectedId] : null
      )
    })
  })


  // export const selectCurrentBook=createSelector(
  //   selectBookEntities,
  //   selectCurrentBookId,
  //   (bookEntities,bookId)=>bookId && bookEntities[bookId]
  // )

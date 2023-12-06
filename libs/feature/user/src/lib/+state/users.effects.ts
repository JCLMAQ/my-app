
// @Injectable()
// export class UsersEffects {
//   private actions$ = inject(Actions);

import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of } from "rxjs";
import { UserService } from "../services/user.service";
import { usersAPIActions, usersPageActions } from "./users.actions";

//   init$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(UsersActions.initUsers),
//       switchMap(() => of(UsersActions.loadUsersSuccess({ users: [] }))),
//       catchError((error) => {
//         console.error('Error', error);
//         return of(UsersActions.loadUsersFailure({ error }));
//       }),
//     ),
//   );
// }

// @Effect()
// const loadItems$ = this.actions$.pipe(
//   ofType(UsersActions.usersPageActions.load),
//   switchMap(() =>
//     this.usersService.getAllUserItems().pipe(
//       map(items => loadItemsSuccess({ items })),
//       catchError(error => of(loadItemsFailure({ error })))
//     )
//   )
// );

export const loadUsers = createEffect(
  (
    actions$ = inject(Actions),
    usersService = inject(UserService)
  ) => {
    return actions$.pipe(
      ofType(usersPageActions.load),
      // switchMap(() => usersService.getAllUserItems().pipe(
      concatMap(() => usersService.getAllUserItems().pipe(
          map((users) =>
            usersAPIActions.loadUsersSuccess({ users })
          ),
          catchError((error) =>
            of(usersAPIActions.loadUsersFailure({ error }))
          )
        )
        )
        );
      },
      {
        functional: true,
      });

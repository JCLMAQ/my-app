
// @Injectable()
// export class UsersEffects {
//   private actions$ = inject(Actions);

import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of } from "rxjs";
import { UsersActions } from "user";
import { UserService } from "../services/user.service";

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

export const loadUsers = createEffect(
  (
    actions$ = inject(Actions),
    usersService = inject(UserService)
  ) => {
    return actions$.pipe(
      ofType(UsersActions.usersPageActions.load),
      concatMap(() =>
        usersService.getAllUserItems.pipe(
          map((users) =>
            UsersActions.usersAPIActions.loadUsersSuccess({ users })
          ),
          catchError((error) =>
            of(UsersActions.usersAPIActions.loadUsersFailure({ error }))
          )
        )
      )
    );
  },
  {
    functional: true,
  }
);


// @Injectable()
// export class UsersEffects {
//   private actions$ = inject(Actions);

import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
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
// delay(1500)

// export class UsersEffects {

//   // constructor(private actions$: Actions, private tasksService: TasksService) {}
//   private actions$ = inject(Actions);
//   private usersService = inject(UserService);
  export const getUsers = createEffect(
    (
      actions$ = inject(Actions),
      usersService = inject(UserService)
    ) => {
       return actions$.pipe(
          ofType(usersAPIActions.loadUsers),
          mergeMap( () => {
            return usersService.getUsers().pipe(
              map( (users) => usersAPIActions.loadUsersSuccess({users})),
              catchError((error) =>
                of(usersAPIActions.loadUsersFailure({error: error.message}))
              )
            );
            }
          )
       )
    },
    {
      functional: true,
    });



export const loadUsers = createEffect(
  (
    actions$ = inject(Actions),
    usersService = inject(UserService)
  ) => {
    return actions$.pipe(
      ofType(usersPageActions.load),
      // ofType(usersPageActions.load),
      // switchMap(() => usersService.getAllUserItems().pipe(
      mergeMap(() => { return usersService.getAllUserItems().pipe(
        tap((value) => console.log('Après: ' + value)),
        // (delay(1500)),
          map((users) =>
            usersAPIActions.loadUsersSuccess({ users })
          ),
          catchError((error) =>
            of(usersAPIActions.loadUsersFailure({ error }))
          )
        )}
        )
        );
      },
      {
        functional: true,
      });

  // export const getUsers = createEffect(
  //   (
  //     actions$ = inject(Actions),
  //     usersService = inject(UserService)
  //   ) => {
  //     return actions$.pipe(
  //       ofType(usersAPIActions.loadUsers),
  //       mergeMapMap(()=> {
  //         return usersService.getAllUserItems().pipe(
  //           map((users) => usersAPIActions.loadUsersSuccess({ users })),
  //           catchError((error) =>
  //             of(usersAPIActions.loadUsersFailure({ error: error.message }))
  //         )
  //         )
  //       }

  //       )

  //     )
  //   }
  // );
      /*
       Example:

@Injectable()
export class PostsEffects {
  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.getPosts),
      mergeMap(() => {
        return this.postsService.getPosts().pipe(
          map((posts) => PostsActions.getPostsSuccess({ posts })),
          catchError((error) =>
            of(PostsActions.getPostsFailure({ error: error.message }))
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private postsService: PostsService) {}
}

      */

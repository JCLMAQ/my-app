
// @Injectable()
// export class UsersEffects {
//   private actions$ = inject(Actions);

import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { UsersService } from "../services/users.service";
import { usersAPIActions, usersPageActions } from "./users.actions";



export class UsersEffects {

  private actions$ = inject(Actions);
  private tasksService = inject(UsersService);

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersAPIActions.loadUsers),
      mergeMap( () => {
        return this.tasksService.getUsers().pipe(
          map( (users) => usersAPIActions.loadUsersSuccess({users})),
          catchError((error) =>
          of(usersAPIActions.loadUsersFailure({error: error.message}))
          )
        );
      }
    )
    )
  )

  init$ = createEffect(() =>
  this.actions$.pipe(
    ofType(usersPageActions.init),
    switchMap(() => of(usersAPIActions.loadUsersSuccess({ users: [] }))),

  ),
);

}

//   export const getUsers = createEffect(
//     (
//       actions$ = inject(Actions),
//       usersService = inject(UsersService)
//     ) => {
//        return actions$.pipe(
//           ofType(usersAPIActions.loadUsers),
//           mergeMap( () => {
//             return usersService.getUsers().pipe(
//               map( (users) => usersAPIActions.loadUsersSuccess({users})),
//               catchError((error) =>
//                 of(usersAPIActions.loadUsersFailure({error: error.message}))
//               )
//             );
//             }
//           )
//        )
//     },
//     {
//       functional: true,
//     });



// export const loadUsers = createEffect(
//   (
//     actions$ = inject(Actions),
//     usersService = inject(UsersService)
//   ) => {
//     return actions$.pipe(
//       ofType(usersPageActions.load),
//       // ofType(usersPageActions.load),
//       // switchMap(() => usersService.getAllUserItems().pipe(
//       mergeMap(() => { return usersService.getAllUserItems().pipe(
//         tap((value) => console.log('Après: ' + value)),
//         // (delay(1500)),
//           map((users) =>
//             usersAPIActions.loadUsersSuccess({ users })
//           ),
//           catchError((error) =>
//             of(usersAPIActions.loadUsersFailure({ error }))
//           )
//         )}
//         )
//         );
//       },
//       {
//         functional: true,
//       });

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

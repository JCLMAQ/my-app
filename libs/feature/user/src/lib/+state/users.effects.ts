
// @Injectable()
// export class UsersEffects {
//   private actions$ = inject(Actions);

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

// export const loadScientists = createEffect(
  // (
  //   actions$ = inject(Actions),
  //   scientistsService = inject(ScientistsService)
  // ) => {
  //   return actions$.pipe(
  //     ofType(UsersActions.usersPageActions.load),
  //     concatMap(() =>
  //       UserService..pipe(
  //         map((users) =>
  //           UsersActions.usersActionsAPI.loadUsersSuccess({ users })
  //         ),
  //         catchError((error) =>
  //           of(UsersActions.usersActionsAPI.loadUsersFailure({ error }))
  //         )
  //       )
  //     )
  //   );
  // },
  // {
  //   functional: true,
  // }
// );

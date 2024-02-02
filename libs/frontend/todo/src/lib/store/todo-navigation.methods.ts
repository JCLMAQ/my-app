import { patchState, signalStoreFeature, type, withMethods, withState } from "@ngrx/signals";
import { TodoStateInterface } from "./todo.state";

// export function withNavigationSelectors() {
//   return signalStoreFeature(
//     { state: type<TodoStateInterface>() },
//     withState(
//       {
//         currentPosition: 0,
//         lastPosition: 0,
//         navigation: {
//           hasNext: false,
//           hasPrevious: false,
//           isFirst: false,
//           isLast: false
//         }
//       }
//     ),
//   );
// }


export function withNavigationMethods() {
  return signalStoreFeature(
    { state: type<TodoStateInterface>() },
    withState(
      {
        currentPosition: 0,
        lastPosition: 0,
        navigation: {
          hasNext: false,
          hasPrevious: false,
          isFirst: false,
          isLast: false
        }
      }
    ),
    withMethods(
      (store) => ({
        // setNavigation({ currentPosition, lastPosition, navigation }) {
        //   patchState(store, {
        //     currentPosition,
        //     lastPosition,
        //     navigation
        //   });
        // },

        initNavButton(todoId) {
          let currentPosition = 0;
          let lastPosition = 0;
          if(store.selection().selected.length <= 1 ) {
            currentPosition = store.items().findIndex(p => p.id === todoId);
            if ( currentPosition === -1) {
              currentPosition = 0;
            }
            lastPosition = store.items().length - 1;
          } else {
            currentPosition = store.selection().selected.findIndex(p => p.id === todoId);
            lastPosition = store.selection().selected.length - 1;
          }
          if(lastPosition < 0 ) { lastPosition = 0; }
          if(lastPosition < currentPosition ) { lastPosition = currentPosition; }
          patchState(store, {
            currentPosition,
            lastPosition,
            // selectedId: todoId
          });
          this.navStateMgt(currentPosition, lastPosition);
        },

        navStateMgt( currentPosition: number, lastPosition: number) {
          if(lastPosition < 0 ) { lastPosition = 0; }
          let hasNext = true;
          let hasPrevious = true;
          let isFirst = false;
          let isLast = false;
          if (currentPosition === 0) {
            hasNext = true;
            hasPrevious = false;
            isFirst = true;
            isLast = false;
          } else
            if (currentPosition === lastPosition) {
              hasNext = false;
              hasPrevious = true;
              isFirst = false;
              isLast = true;
            } else {
              hasNext = true;
              hasPrevious = true;
              isFirst = false;
              isLast = false;
            }
          patchState(store, {
            currentPosition,
            lastPosition,
            navigation: {
              hasNext,
              hasPrevious,
              isFirst,
              isLast
            }
          });
          // const valtodoEntity = store.items().at(currentPosition)
          // const todoId = valtodoEntity?.id;
          // // const todoItem = store.todoEntities().find(p => p.id === todoId);
          // patchState(store, {
          //   selectedId: todoId
          // })
        },

        next(currentPosition, lastPosition) {
          currentPosition = currentPosition + 1
          if (currentPosition > lastPosition) {
            currentPosition = lastPosition
          }
          // let currentPosition = store.currentPosition() + 1
          // const lastPosition = store.lastPosition()
          // if (currentPosition > store.lastPosition()) {
          //   currentPosition = store.lastPosition()
          // }
          this.navStateMgt( currentPosition, lastPosition );
        },

        last(lastPosition) {
          const currentPosition = lastPosition
          this.navStateMgt( currentPosition, lastPosition );
        },

        first(lastPosition) {
          const currentPosition = 0;
          // const lastPosition = store.lastPosition()
          this.navStateMgt( currentPosition, lastPosition );
        },

        previous(currentPosition, lastPosition) {
          currentPosition = currentPosition - 1
          if (currentPosition < 0) {
            currentPosition= 0
          }
          // const lastPosition = store.lastPosition()
          this.navStateMgt( currentPosition, lastPosition );
        },

      })
    )
  )}

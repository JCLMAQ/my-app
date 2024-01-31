import { patchState, signalStoreFeature, type, withMethods, withState } from "@ngrx/signals";
import { TodoStateInterface } from "./todo.state";

export function withNavigationSelectors() {
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
  );
}


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
        setNavigation({ currentPosition, lastPosition, navigation }) {
          patchState(store, {
            currentPosition,
            lastPosition,
            navigation
          });
        },

        initNavButton(todoId) {
          let currentPosition = 0;
          let lastPosition =store.items().length - 1 ;
          if(store.selection().selected.length <= 1 ) {
            currentPosition = store.items().findIndex(p => p.id === todoId);
            if ( currentPosition === -1) {
              currentPosition = 0;
            }
            lastPosition = store.items().length - 1 ;
          } else {
            currentPosition = store.selection().selected.findIndex(p => p.id === todoId);
            lastPosition = store.selection().selected.length - 1;
          }
          patchState(store, {
            currentPosition,
            lastPosition
          })
          this.navStateMgt(currentPosition);
        },

        navStateMgt( currentPosition: number) {
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
            if (currentPosition === store.lastPosition()) {
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
            navigation: {
              hasNext,
              hasPrevious,
              isFirst,
              isLast
            }
          });
          const valtodoEntity = store.items().at(currentPosition)
          const todoId = valtodoEntity?.id;
          // const todoItem = store.todoEntities().find(p => p.id === todoId);
          patchState(store, {
            selectedId: todoId
          })
        },

        next() {
          let currentPosition = store.currentPosition() + 1
          if (currentPosition > store.lastPosition()) {
            currentPosition = store.lastPosition()
          }
          this.navStateMgt( currentPosition);
        },

        last() {
          const currentPosition = store.lastPosition();
          this.navStateMgt( currentPosition)
        },

        first() {
          const currentPosition = 0;
          this.navStateMgt( currentPosition);
        },

        previous() {
          let currentPosition = store.currentPosition() - 1
          if (currentPosition < 0) {
            currentPosition= 0
          }
          this.navStateMgt( currentPosition );
        },

      })
    )
  )}

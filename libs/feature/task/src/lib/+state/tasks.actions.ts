import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ITask } from './tasks.models';

// export const initTasks = createAction('[Tasks Page] Init');


export const tasksAPIActions = createActionGroup({
  source: 'Tasks API',
  events: {
    'Load Tasks Success': props<{ tasks: ITask[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),
  },
});

export const tasksPageActions = createActionGroup({
  source: 'Tasks Page',
  events: {
    'Init': emptyProps(),
    'Load Page': props<{ tasks: ITask[] }>()
  }
  // events: {
  //   load: emptyProps(),
  //   select: props<IUser>(),
  // },
});

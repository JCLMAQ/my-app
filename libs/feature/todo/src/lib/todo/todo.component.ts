import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoStore } from '../store/todo.state';

@Component({
  selector: 'lib-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoStore],
})
export class TodoComponent  {
  readonly store = inject(TodoStore);

  // This ngOnInit is included directly within the store hoocks
// ngOnInit(): void {
//   this.store.loadAllTodos();
// }
// readonly todos$ = this.store.select(tasksFeature.selectAll);
// readonly istaskSelected$ = this.store.select(tasksFeature.selectIsTaskSelected);
// readonly selectedtask$ = this.store.select(tasksFeature.selectSelectedTask);
// readonly loaded$ = this.store.select(tasksFeature.selectLoaded)
// readonly isLoading$ = this.store.pipe(delay(1500),select(tasksFeature.selectIsLoading) );
// readonly error$ = this.store.pipe(select(tasksFeature.selectError));



  // addTodo() {
  //   this.store.addTodo(this.form.value.todoValue);
  //   this.form.reset();
  // }

}

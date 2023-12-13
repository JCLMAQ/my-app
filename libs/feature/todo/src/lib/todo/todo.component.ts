import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoStore } from './store/todo.state';

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




  // addTodo() {
  //   this.store.addTodo(this.form.value.todoValue);
  //   this.form.reset();
  // }

}

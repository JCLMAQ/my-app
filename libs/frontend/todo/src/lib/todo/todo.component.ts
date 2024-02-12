import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { TodoStore } from '../store/todo.state';
import { TodoListComponent } from '../todo-list/todo-list.component';
// import { CallState } from '@fe/shared/util-common';


@Component({
  selector: 'lib-todo',
  standalone: true,
  imports: [
    CommonModule,
    TodoListComponent,
    ...MATERIAL,
  ],
  templateUrl: './todo.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrl: './todo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoStore],
})

export class TodoComponent implements OnInit {

  readonly todoStore = inject(TodoStore);
  readonly router = inject(Router)

ngOnInit(): void {
  console.log('ngOnInit step')
}

}

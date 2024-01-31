import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { patchState } from '@ngrx/signals';
import { TodoInterface, TodoPartialInterface } from '../store/todo.model';
import { TodoStore } from '../store/todo.state';

interface TodoForm
  extends FormGroup<{
    id: FormControl<string | undefined | null>;
    title?: FormControl<string | undefined | null>;
    content?: FormControl<string | undefined | null>;
    todoState?: FormControl<string | undefined | null>;
    orderTodo?: FormControl<number | undefined | null>;
  }> { }

@Component({
  selector: 'lib-todo-detail',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // providers: [TodoStore],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class TodoDetailComponent implements OnInit {

  // state = signalState({
  //   currentPosition: 0,
  //   lastPosition: 0,
  //   navigation: {
  //     hasNext: false,
  //     hasPrevious: false,
  //     isFirst: false,
  //     isLast: false
  //   }
  // });

  // currentPosition = 0;
  // lastPosition = 0;
  // hasNext = false;
  // hasPrevious = false;
  // isFirst = false;
  // isLast = false;

  readonly todoStore = inject(TodoStore);

  public todo: TodoPartialInterface | undefined | null;

  form!: FormGroup;

  todoId!: string | undefined;
  todoItem: TodoInterface | undefined;

  submitted = false;
  mode: 'create' | 'update' | 'view' | undefined;
  isAdmin = false
  formControls = {
    title: ['', []],
    content: ['', []]
  };



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>,
    // private alertService: AlertService,
  ) {
    this.todoId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    effect(() => {
      this.fetchData();
    })
    // this.initNavButton();
    patchState(this.todoStore, { selectedId: this.todoId });
    this.todoStore.initNavButton(this.todoId);
  }

  fetchData(): void {

    const totalSelected = this.todoStore.selection().selected.entries
    console.log(totalSelected)
    console.log(this.todoStore.selectedItems())
  }

  ngOnInit(): void {
    this.todoId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    this.formControls = {
      title: ['', []],
      content: ['', []]
    }
    this.form = this.fb.group(this.formControls);

    console.log("End of ngInit ")
  }

  reload() {
    if (this.mode === 'update' || this.mode === 'view') {
      this.form.patchValue({
        id: this.todoItem?.id,
        title: this.todoItem?.title,
        content: this.todoItem?.content
      });
    } else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...this.formControls,
      });
    };

  }



  save() {
    const val = this.form.value;
    if (this.mode == 'update') {
    } else if (this.mode == 'create') {

      // todo

    }
    this.router.navigate(['todos']);
  }

  add() { }

  create() { }

  cancel() { }

  remove() { }

  reset() { }

  virtualRemove() { }

  next() {
    this.todoStore.next();
    this.reload();
  }

  last() {
    this.todoStore.last()
    this.reload();
  }

  first() {
    this.todoStore.filter();
    this.reload();
  }

  previous() {
    this.todoStore.previous();
    this.reload();
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  backHome() {
    this.router.navigate(['home']);
  }
}

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
    id: FormControl<string| undefined | null>;
    title?: FormControl<string | undefined | null>;
    content?: FormControl<string| undefined | null>;
    todoState?: FormControl<string| undefined | null>;
    orderTodo?: FormControl<number| undefined | null>;
  }> {}


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


export class TodoDetailComponent implements OnInit{

  readonly todoStore = inject(TodoStore);

  public todo: TodoPartialInterface | undefined | null;

  form!: FormGroup;

  todoId!: string;

  todosEntities!: TodoInterface[];

  submitted = false;
  mode: 'create' | 'update' | 'view' | undefined;
  isAdmin: boolean = false
  formControls = {title: ['', []],
  content: ['',[]]};


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>,
    // private alertService: AlertService,
  ) {
    this.todoId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    effect(()=> {
      this.fetchData();
    //   const state = getState(this.todoStore);
    // console.log('Effect contructor - Todo state changed effects - details', state);
    })
    patchState(this.todoStore, { selectedId: this.todoId});
    console.log("Contructor - After Effect: Selected id Post Store: ", this.todoStore.selectedId())
    console.log("Contructor - After Effect:Selected Post: ", this.todoStore.selectedItem())


  console.log("this.todo after-effect: ", this.todo)
  }

  fetchData(): void {
    this.todosEntities = this.todoStore.todoEntities();
    console.log("C'EST ICI:", this.todoStore.selectedId())
    console.log("C'EST ICI BIS:", this.todoStore.selectedItem())
  console.log('todoEntities fetched - details: ', this.todoStore.todoEntities())
    this.todo = this.todoStore.todoEntities().find((todo)=> todo.id === this.todoId);
  console.log('todo fetched result - details: ', this.todo);
    this.reload(this.todoId)
    // this.todoStore.selectedId()=== this.todoId;
    // this.todo = this.todoStore.selectedItem()
  }

  ngOnInit(): void {
    this.todoId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
  // console.log("ng init todoID: ",this.todoId);
  // console.log("ng init mode: ",this.mode);
    this.formControls = {
      title: ['', []],
      content: ['',[]]
    }
    this.form = this.fb.group(this.formControls);
  console.log("End of ngInit ")
  }

  reload(id: string | undefined) {
    if(this.mode === 'update' || this.mode ===  'view') {
      this.form.patchValue({
        id: this.todo?.id,
        title: this.todo?.title,
        content: this.todo?.content
      });
    } else if (this.mode == 'create'  ) {
      this.form = this.fb.group({
          ...this.formControls,
      });
    }
  }

  save() {
    const val = this.form.value;
    if (this.mode == 'update') {
        // this.usersService.updateUser(user.id, user);
    } else if (this.mode == 'create') {

        // this.usersService.createUser(user, {isOptimistic: false})


    }
    this.router.navigate(['todos']);
}

  add() {}

  create() {}

  cancel() {}

  remove() {}

  reset() {}

  virtualRemove() {}

  next() {}

  last() {}

  first() {}

  previous() {}

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  backHome() {
    this.router.navigate(['home']);
  }
}

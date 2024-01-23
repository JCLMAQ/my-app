import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { TodoPartialInterface } from '../store/todo.model';
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
  providers: [],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class TodoDetailComponent implements OnInit{

  readonly todoStore = inject(TodoStore);

  public todo: TodoPartialInterface | undefined | null;

  form!: FormGroup;

  todoId!: string;

  submitted = false;
  mode: 'create' | 'update' | 'view' | undefined;
  isAdmin: boolean = false
  formControls = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>,
    // private alertService: AlertService,
  ) {
    this.mode = 'view'
  }

  ngOnInit(): void {
    this.todoId = this.route.snapshot.params['id'];
    this.todoStore.selectedId()=== this.todoId;
    this.todo = this.todoStore.selectedItem()
    // this.isAddMode = !this.userId; // Only for User profil
    this.mode = this.route.snapshot.params['mode'];

    this.formControls = {
      title: ['', []],
      content: ['',[]]
    }

    this.todo = this.todoStore.items().find((todo)=> todo.id === this.todoId);

    if (this.mode === 'update' || this.mode ===  'view'){
      this.form = this.fb.group(this.formControls);

      this.todo = this.todoStore.todoEntities().find((todo)=> todo.id === this.todoId);
      console.log("this.todo init: ", this.todo)
      this.form.patchValue({
        id: this.todoId,
        title: this.todo?.title,
        content: this.todo?.content
      });
      // if(this.mode == 'view' ) { this.form.disable()}
    } else
        if (this.mode == 'create' ) {
        // this.form = this.fb.group({
        //     ...this.formControls,
        // });
      }

  }

  reload(id: string | undefined) {

    if(this.mode === 'update' || this.mode ===  'view') {
      this.todo = this.todoStore.items().find((todo)=> todo.id === id)
      // this.form.patchValue({...this.todo})
      this.form.patchValue({
        id: this.todo?.id,
        title: this.todo?.title,
        content: this.todo?.content
      });
    } else if (this.mode == 'create'  ) {
      // this.form = this.fb.group({
      //     ...this.formControls,

      // });
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

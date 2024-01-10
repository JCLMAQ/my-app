import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { TodoInterface } from '../store/todo.model';
import { TodoStore } from '../store/todo.state';

interface TodoForm
  extends FormGroup<{
    id: FormControl<string>;
    title: FormControl<string>;
    content: FormControl<string>;
    todoState: FormControl<string>;
    orderTodo: FormControl<number>;
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

  public todo: TodoInterface | undefined | null;

  form!: TodoForm;

  todoId!: string;
  isAddMode!: boolean;
  isAdmin!: boolean; // Needed to be sure that the user has an Id
  loading = false;
  submitted = false;
  hidePassword = true;
  mode: 'create' | 'update' | 'view' | undefined;
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
    // this.isAddMode = !this.userId; // Only for User profil
    this.mode = this.route.snapshot.params['mode'];

  }

  reload(id: string | undefined) {

    if (this.mode == 'update' || 'view') {
    //   this.form.patchValue({...data.course})
      this.form.patchValue({

      });
    } else if (this.mode == 'create' || this.isAddMode ) {
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

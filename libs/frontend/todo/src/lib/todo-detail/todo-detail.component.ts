import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { UsersService } from '@my-app/data/users';
import { TodoInterface } from '../store/todo.model';

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
})
export class TodoDetailComponent implements OnInit{

  public todo: TodoInterface | undefined | null;

  todoId!: string;
  isAddMode!: boolean;
  mode: 'create' | 'update' | 'view' | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private dateAdapter: DateAdapter<Date>,
    // private alertService: AlertService,
  ) {
    this.mode = 'view'
  }

  ngOnInit(): void {
    this.todoId = this.route.snapshot.params['id'];
    // this.isAddMode = !this.todoId; // Only for User profil
    this.mode = this.route.snapshot.params['mode'];
  }



}

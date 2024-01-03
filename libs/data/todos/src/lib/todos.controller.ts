import { Public } from '@my-app/data/common';
import { Auth, AuthType } from '@my-app/data/iam';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { TodosService } from './todos.service';

@Controller()
export class TodosController {
  constructor(private todosService: TodosService) {}

    @Public()
    @Auth(AuthType.None)
    @Get('todos')
    async getTodos(): Promise<Todo[]>{
      const todos: Todo[] = await this.todosService.getAllTodos()
      console.log('from Todos controlors: ', todos)
      return todos
    }

    @Public()
    @Auth(AuthType.None)
    @Get('todoswithtasks')
    async getAllTodosWithTasks(): Promise<Todo[]>{
      const todos: Todo[] = await this.todosService.getAllTodosWithTasks({})
      console.log('from Todos controlors with tasks: ', todos)
      return todos
    }

    @Auth(AuthType.None)
    @Post(`todo`)
    async createTodo(@Body() data: {
      title: string;
      content: string;
      comment: string;
      userId: string;
      orgId: string;
    }) {
      const { title , content, comment, userId, orgId} = data;
      return this.todosService.createTodo({
        comment,
        content,
        title,
        userId,
        orgId
      });
    }

}

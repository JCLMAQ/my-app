import { Public } from '@my-app/data/common';
import { Auth, AuthType } from '@my-app/data/iam';
import { Controller, Get } from '@nestjs/common';
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

}

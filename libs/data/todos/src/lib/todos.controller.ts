import { Public } from '@my-app/data/common';
import { Auth, AuthType } from '@my-app/data/iam';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { TodosService } from './todos.service';

@Controller()
export class TodosController {
  constructor(private todosService: TodosService) {}

    @Public()
    @Auth(AuthType.None)
    @Get('todos')
    async getUserTodos(@Body() data:  {
      orgId?: string;
      ownerId?: string;
      withTasks: boolean;
    }): Promise<Todo[]>{
      const todos: Todo[] = await this.todosService.getTodos( data )
      return todos
    }

    @Public()
    @Auth(AuthType.None)
    @Get('todo')
    async getOneTodo(@Body() data:  {
      todoId: string
      withTasks?: boolean;
    }): Promise<Todo | null>{
      const todo = this.todosService.getOneTodo( data )
      return todo
    }

    @Auth(AuthType.None)
    @Post(`createtodo`)
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

    @Public()
    @Auth(AuthType.None)
    @Put('updatetodo')
    async updateTodo(@Body() data:  {
      todoId: string,
      update: Prisma.TodoUpdateInput
    }): Promise<Todo | null>{
      return this.todosService.deleteTodo( data )
    }

    @Public()
    @Auth(AuthType.None)
    @Put('deletetodo')
    async deleteTodo(@Body() data:  {
      todoId: string
    }): Promise<Todo | null>{
      return this.todosService.deleteTodo( data )
    }

    // For tests
    @Public()
    @Auth(AuthType.Bearer)
    @Get('alltodos')
    async getAllTodos(): Promise<Todo[]>{
      return await this.todosService.getAllTodos()
    }

    @Public()
    @Auth(AuthType.Bearer)
    @Get('todoswithtasks')
    async getAllTodosWithTasks(): Promise<Todo[]>{
      return await this.todosService.getAllTodosWithTasks()
    }

}

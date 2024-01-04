import { Public } from '@my-app/data/common';
import { Auth, AuthType } from '@my-app/data/iam';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
      withTasks: string;
    }): Promise<Todo[]>{
      console.log("Data: ", data)
      const todos: Todo[] = await this.todosService.getTodos( data )
      return todos
    }

    @Public()
    @Auth(AuthType.None)
    @Get('todo')
    async getOneTodo(@Body() data:  {
      todoId: string
      withTasks?: string;
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
    @Put('updatetodo/:id')
    async updateTodo(
      @Param('id') id: string,
      @Body() data: Prisma.TodoUpdateInput): Promise<Todo | null>{
      return this.todosService.updateTodo({
        where: { id: String(id) },
        data:  data ,
        } )
    }

    @Public()
    @Auth(AuthType.None)
    @Delete('deletetodo/:id')
    async deleteTodo(
      @Param('id') id: string,
      ): Promise<Todo | null>{
        console.log("delete")
      return this.todosService.deleteTodo({ id: String(id) } )
    }

    // For tests
    @Public()
    @Auth(AuthType.None)
    @Get('alltodos')
    async getAllTodos(): Promise<Todo[]>{
      return await this.todosService.getAllTodos()
    }

    @Public()
    @Auth(AuthType.None)
    @Get('todoswithtasks')
    async getAllTodosWithTasks(): Promise<Todo[]>{
      return await this.todosService.getAllTodosWithTasks()
    }

}

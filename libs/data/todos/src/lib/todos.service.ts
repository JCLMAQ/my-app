import { PrismaService } from '@my-app/prisma';
import { Injectable } from '@nestjs/common';
import { Task, Todo, UserTodoLink } from '@prisma/client';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {

  constructor(
    private prisma: PrismaService,
    // private enhancedPrisma: EnhancedPrismaService,
    private repository: TodosRepository
  ) {}

  // async getAllTodos(): Promise<Todo[]> {
  //   const todosReturn = await this.prisma.todo.findMany()
  //   console.log(todosReturn)
  //   return todosReturn
  // }

  async createTodo(params: {
    content: Todo[`content`];
    comment: UserTodoLink[`comment`];
    title: Todo[`title`];
    userId: UserTodoLink[`userId`];
    orgId: Todo[`orgId`]}) {
    const { title , content, comment, userId, orgId } = params;

    // call repository layer
    const todo = await this.repository.createTodo({
      data: {
        title,
        content,
        Users: {
          create: {
            userId: userId,
            isAuthor: true,
            isAssigned: true,
            comment
          }
        },
        orderTodo: 0,
        owner: {
          connect: {
            id: userId
          }
        },
        org: {
          connect: {
            id: orgId
          }
        }
      },
    });

    // do other things in the service layer... e.g. send email of todo

    return todo;
  }

  async getTodos(params: {
    // skip: undefined,
    // take: undefined,
    // cursor: undefined,
    // orderBy: undefined,
    where: {
        Users: { userId: string },
        Orgs: { orgId: string }
    },
    includes: { Tasks: true }
  }) {
    const todos = await this.repository.getTodos( params);
    return todos;
  }

  async getAllTodos(){
    return await this.repository.getAllTodos();
  }
  async getAllTodosWithTasks(params: { include?: Task}): Promise<Todo[]>{
    const { include } = params;
    return await this.getAllTodosWithTasks({ include});
  }
}

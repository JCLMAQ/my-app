import { PrismaService } from '@my-app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, Todo, UserTodoLink } from '@prisma/client';
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
    return todo;
  }

  async getTodos(params: {
      skip?: number,
      take?: number,
      cursor?: Prisma.TodoWhereUniqueInput,
      orderBy?: Prisma.TodoOrderByWithRelationInput,
      orgId?: Todo[`orgId`],
      ownerId?: Todo[`ownerId`],
      withTasks: boolean
    })
    {
      const { ownerId, orgId, withTasks} = params
      return await this.repository.getTodos( { include: { Tasks: Boolean(withTasks)}, where: { ownerId, orgId }});
    }

  async getOneTodo(params: {
    withTasks?: boolean,
    todoId: Todo[`id`]
  }) {
    const {withTasks, todoId} = params
    return await this.repository.getOneTodo({ include: { Tasks: Boolean(withTasks)}, where: { id: todoId}})
  }

  async updateTodo( params: {
    todoId: Todo[`id`],
    data: Prisma.TodoUpdateInput,
  })
  {
    const {todoId, data} = params;
    return await this.repository.updateTodo({where: { id: todoId}, data});
  }

  async deleteTodo(params: {
    todoId: Todo[`id`],
  }) {
    const {todoId} = params;
    return await this.repository.deleteTodo({ where: { id: todoId }})
  }


  // For test purpose
  async getAllTodos(){
    return await this.repository.getAllTodos();
  }

async getAllTodosWithTasks(): Promise<Todo[]>{
    return await this.repository.getAllTodosWithTasks();
  }


}

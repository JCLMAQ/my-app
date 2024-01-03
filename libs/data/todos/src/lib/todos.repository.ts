import { PrismaService } from '@my-app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';

// Based on: https://www.tomray.dev/nestjs-prisma#seeding-data-with-prisma-studio
@Injectable()
export class TodosRepository {

  constructor(
    private prisma: PrismaService,
  ) {}

  async createTodo(params: { data: Prisma.TodoCreateInput }): Promise<Todo> {
    const { data } = params;
    return this.prisma.todo.create({ data });
  }

  async getTodos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
    include?: Prisma.TodoInclude;
    where?: Prisma.TodoWhereInput
  }): Promise<Todo[]> {
    return this.prisma.todo.findMany({...params});
  }

  async getOneTodo(params: {
    include?:Prisma.TodoInclude;
    where: Prisma.TodoWhereUniqueInput
  }): Promise<Todo | null> {
    return this.prisma.todo.findUnique({ ...params } )
  }

  async updateTodo(params: {
    where: Prisma.TodoWhereUniqueInput;
    data: Prisma.TodoUpdateInput;
  }): Promise<Todo> {
    const { where, data } = params;
    return this.prisma.todo.update({ where, data });
  }

  async deleteTodo(params: {
    where: Prisma.TodoWhereUniqueInput;
  }): Promise<Todo> {
    const { where } = params;
    return this.prisma.todo.delete({ where });
  }


  // For test purpose
  async getAllTodos(): Promise<Todo[]> {
    return this.prisma.todo.findMany()
  }

  async getAllTodosWithTasks(): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      include: {
        Tasks: true
      }
    })
  }

}

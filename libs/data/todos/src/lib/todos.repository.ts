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
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
  }): Promise<Todo[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.todo.findMany({ skip, take, cursor, where, orderBy });
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

  async getAllTodos(): Promise<Todo[]> {
    // const todosReturn = await this.prisma.todo.findMany()
    // console.log(todosReturn)
    return this.prisma.todo.findMany()
  }

}

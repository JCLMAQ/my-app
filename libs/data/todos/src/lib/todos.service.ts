import { PrismaService } from '@my-app/prisma';
import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';

@Injectable()
export class TodosService {

  constructor(
    private prisma: PrismaService,
    // private enhancedPrisma: EnhancedPrismaService,
    // private todosRepository: TodosRepository
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    const todosReturn = await this.prisma.todo.findMany()
    console.log(todosReturn)
    return todosReturn
  }

}

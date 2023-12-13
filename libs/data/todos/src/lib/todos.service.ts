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
    return await this.prisma.todo.findMany()
  }

}

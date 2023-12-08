import { PrismaService } from '@my-app/prisma';
import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {

  constructor(
    private prisma: PrismaService,
    // private enhancedPrisma: EnhancedPrismaService,
    // private usersRepository: UsersRepository
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.prisma.task.findMany()
  }


}

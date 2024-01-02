import { PrismaModule } from '@my-app/prisma';
import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { TodosService } from './todos.service';

@Module({
  imports: [PrismaModule],
  controllers: [TodosController],
  providers: [TodosRepository, TodosService],
  exports: [TodosService],
})
export class TodosModule {}

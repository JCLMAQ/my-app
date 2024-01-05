import { PrismaModule } from '@my-app/prisma';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Global()
@Module({
  imports: [
    PrismaModule,
    ConfigModule
  ],
  controllers: [TasksController],
  providers: [
    TasksRepository,
    TasksService],
  exports: [TasksService],
})
export class TasksModule {}

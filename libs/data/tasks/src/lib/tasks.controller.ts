import { Public } from '@my-app/data/common';
import { Auth, AuthType } from '@my-app/data/iam';
import { Controller, Get } from '@nestjs/common';
import { Task } from '@prisma/client';
import { TasksService } from './tasks.service';

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Public()
  @Auth(AuthType.None)
  @Get('tasks')

  async getTasks(): Promise<Task[]>{
    const tasks: Task[] = await this.tasksService.getAllTasks()
    console.log('from Tasks controlors: ', tasks)
    return tasks
  }

}

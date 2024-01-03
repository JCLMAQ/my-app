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

  // async getTodos(params: {
  //   skip: undefined,
  //   take: undefined,
  //   cursor: undefined,
  //   orderBy: undefined,
  //   where: {
  //       Users: {
  //         some: {
  //           user: { userId: string },
  //         },
  //       }



  //       Orgs: { orgId: string }
  //   },
  //   include: { Tasks: true }
  // }) {
  //   // const { skip, take, cursor, orderBy, include, where} = params
  //   // const todos = await this.repository.getTodos( {skip, take, cursor, orderBy, include, where});
  //   // return todos;
  // }

  async getAllTodos(){
    return await this.repository.getAllTodos();
  }
  async getAllTodosWithTasks(params: { include?: Task}): Promise<Todo[]>{
    const { include } = params;
    return await this.getAllTodosWithTasks({ include});
  }
}

// The following query returns all Post records where at least one (some) category assignment (categories) refers to a category named "New category":

// const getPosts = await prisma.post.findMany({
//   where: {
//     categories: {
//       some: {
//         category: {
//           name: 'New Category',
//         },
//       },
//     },
//   },
// })


// model Post {
//   id         Int                 @id @default(autoincrement())
//   title      String
//   categories CategoriesOnPosts[]
// }

// model Category {
//   id    Int                 @id @default(autoincrement())
//   name  String
//   posts CategoriesOnPosts[]
// }

// model CategoriesOnPosts {
//   post       Post     @relation(fields: [postId], references: [id])
//   postId     Int // relation scalar field (used in the `@relation` attribute above)
//   category   Category @relation(fields: [categoryId], references: [id])
//   categoryId Int // relation scalar field (used in the `@relation` attribute above)
//   assignedAt DateTime @default(now())
//   assignedBy String

//   @@id([postId, categoryId])
// }

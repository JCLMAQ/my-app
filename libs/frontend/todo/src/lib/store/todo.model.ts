import { Todo } from "@prisma/client";

export interface TodoInterface extends Todo { Users: true, Tasks: true, SubTodos: true}


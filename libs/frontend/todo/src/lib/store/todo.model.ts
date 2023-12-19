import { Todo } from "@prisma/client";

export interface TodoInterface extends Partial<Todo>{}
// extends Todo {}
// extends Partial<Todo>{}

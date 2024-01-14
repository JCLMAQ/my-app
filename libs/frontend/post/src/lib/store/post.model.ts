import { Post } from "@prisma/client";

export interface PostInterface extends Post { include: { Categories: true, Comments: true, LikedBys: true }}

export type PostPartialInterface = Partial<PostInterface>;

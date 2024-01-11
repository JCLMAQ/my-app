

import { Public } from '@my-app/data/common';
import { Auth, AuthType } from '@my-app/data/iam';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Post as Posts, Prisma } from '@prisma/client';
import { PostsService } from './posts.service';
@Controller()
export class PostsController {
constructor(private postsService: PostsService) {}

  @Public()
  @Auth(AuthType.None)
  @Get('posts')
  async getUserPosts(@Body() data:  {
    orgId?: string;
    ownerId?: string;
    withCategories: string,
    withComments: string,
    withLikedBys: string
  }): Promise<Posts[]| unknown>{
    try {
      const posts: Posts[] = await this.postsService.getPosts( data )
      return posts
    }
    catch (error) {
      return {
          answer: "bad news...",
          success: false,
          message: `${error}`
      }
    }
  }

  @Public()
  @Auth(AuthType.None)
  @Get('post')
  async getOnePost(@Body() data:  {
    postId: string
    withCategories: string,
    withComments: string,
    withLikedBys: string
  }): Promise<Posts | unknown>{
    try {
      return await this.postsService.getOnePost( data )
    } catch (error) {
      return {
          answer: "bad news...",
          success: false,
          message: `${error}`
      }
    }
  }

  @Auth(AuthType.None)
  @Post(`createpost`)
  async createOnePost(@Body() data: {
    title: string;
    content: string;
    userId: string;
    orgId: string;
  }) {
    const { title , content, userId, orgId } = data;
    try {
      return await this.postsService.createOnePost({
        content,
        title,
        userId,
        orgId,
      });
    } catch (error) {
      return {
        answer: "bad news...",
        success: false,
        message: `${error}`
      }
    }
  }

  @Public()
  @Auth(AuthType.None)
  @Put('updatepost/:id')
  async updatePost(
    @Param('id') id: string,
    @Body() data: Prisma.PostUpdateInput): Promise<Posts | unknown>{
      try {
        return await this.postsService.updatePost({
          where: { id: String(id) },
          data:  data ,
          } )
      } catch (error) {
        return {
          answer: "bad news...",
          success: false,
          message: `${error}`
        }
      }

  }

  @Public()
  @Auth(AuthType.None)
  @Delete('deletepost/:id')
  async deletePost(
    @Param('id') id: string,
    ): Promise<Posts | unknown>{
      try {
        return await this.postsService.deletePost({ id: String(id) } )
      } catch (error) {
        return {
          answer: "bad news...",
          success: false,
          message: `${error}`
        }
      }

  }

  // For tests
  @Public()
  @Auth(AuthType.None)
  @Get('allposts')
  async getAllPosts(): Promise<Posts[]>{
    return await this.postsService.getAllPosts()
  }

  @Public()
  @Auth(AuthType.None)
  @Get('postswithrelated')
  async getAllPostsWithRelated(): Promise<Posts[]>{
    return await this.postsService.getAllPostsWithRelated()
  }

}

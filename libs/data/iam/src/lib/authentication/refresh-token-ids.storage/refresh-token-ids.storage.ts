import { PrismaService } from '@my-app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InvalidatedRefreshTokenError } from './invalid-refresh-token.error';

@Injectable()
export class RefreshTokenIdsStorage {
  constructor(
    private prismaService: PrismaService,
    private invalidatedRefreshTokenError: InvalidatedRefreshTokenError,
  ) {}

  async insert(userId: string, tokenId: string): Promise<void> {
    const data: Prisma.RefreshTokenCreateInput = {
      userId : this.getKey(userId),
      tokenId: tokenId,
    };
    // await this.prismaService.refreshToken.create({ data });
    await this.prismaService.refreshToken.upsert({
      where: { userId: data.userId },
      update: { tokenId: data.tokenId },
      create: { userId: data.userId, tokenId: data.tokenId}
    })
  }

  async validate(userId: string, tokenId: string): Promise<boolean> {
    const token = await this.prismaService.refreshToken.findFirst({
      where:  { userId: this.getKey(userId)}
    });

    if (token?.tokenId !== tokenId) {
      throw new InvalidatedRefreshTokenError();
    }
    return token.tokenId === tokenId;
  }

  async invalidate(userId: string): Promise<void> {
    await this.prismaService.refreshToken.delete({
      where: { userId: this.getKey(userId) } });
  }

  private getKey(userId: string): string {
    return `user-${userId}`;
  }

}

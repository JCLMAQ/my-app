import { PrismaService } from '@my-app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, RefreshToken } from '@prisma/client';

@Injectable()
export class RefreshTokenIdsStorageService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RefreshTokenCreateInput): Promise<RefreshToken> {
    const token = this.prisma.refreshToken.create({ data });
    return token;
  }
}

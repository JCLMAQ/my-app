import { PrismaService } from "@my-app/prisma";
import { Injectable } from "@nestjs/common";
import { ApiKey, Prisma } from "@prisma/client";



@Injectable()
export class ApiKeysRepository {
  constructor(
    private prisma: PrismaService,
  ) {}
  async createApiKey(data: Prisma.ApiKeyCreateInput): Promise<ApiKey> {
    const apikeyCreated = await this.prisma.apiKey.create({ data });
    return apikeyCreated;
  }

  async deleteApiKeys(userId: string): Promise<boolean> {
    // Delete all ApiKeys related to a User !!!
    const done = await this.prisma.user.update(
    {
      where: { id: userId },
      data: {
        ApiKeys: {
          deleteMany:{},
        }
      }
    }
    )
    return (!done)
  }

  async deleteOneApiKey(userId: string, apiKeyId: number): Promise<boolean> {
    const done = await this.prisma.user.update(
      {
        where: { id: userId},
        data: {
          ApiKeys: {
            delete: { id: apiKeyId },
          }
        }
      }
    )
    return (!done)
  }

  async findAllApiKeyforOneUser(userId: string): Promise<ApiKey[]> {
    const apiKeys: ApiKey[] = await this.prisma.apiKey.findMany(
      {
        where: {
          user: { id: userId },
        }
      }
    );
    return apiKeys
  }
}

import { PrismaService } from '@my-app/prisma';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { authenticator } from 'otplib';
@Injectable()
export class OtpAuthenticationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {}

  async generateSecret(email: string) {
    const secret = authenticator.generateSecret();
    const appName = this.configService.getOrThrow('TFA_APP_NAME');
    const uri = authenticator.keyuri(email, appName, secret);
    return {
      uri,
      secret,
    };
  }

  verifyCode(code: string, secret: string) {
    return authenticator.verify({
      token: code,
      secret,
    });
  }

  async enableTfaForUser(email: string, secret: string) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { email },
      select: { id: true },
    });
    const userbis: User = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        tfaSecret: secret,
        isTfaEnable: true,
      }
    });
    userbis
  }
}

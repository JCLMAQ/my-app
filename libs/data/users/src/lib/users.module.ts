
import { PrismaModule } from '@my-app/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersRepository } from './users-repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersUtilities } from './users.utilities';

@Module({
  imports: [
    PrismaModule,
    ConfigModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersUtilities],
  exports: [UsersService, UsersUtilities,  UsersRepository],
})
export class UsersModule {}

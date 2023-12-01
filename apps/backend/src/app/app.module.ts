import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthsModule } from '@my-app/data/auths';
import { CommonModule, CrudMiddleware } from '@my-app/data/common';
import { DbConfigModule } from '@my-app/data/db-config';
import { FilesModule } from '@my-app/data/files';
// import { IamModule } from '@my-app/data/iam';
import { IamModule } from '@my-app/data/iam';
import { MailsModule } from '@my-app/data/mails';
import { PostsModule } from '@my-app/data/posts';
import { TimeUtilModule } from '@my-app/data/time-util';
import { UsersModule } from '@my-app/data/users';
import { PrismaModule } from '@my-app/prisma';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import * as Joi from 'joi';
import { ClsModule } from 'nestjs-cls';
import { AcceptLanguageResolver, HeaderResolver, I18nJsonLoader, I18nModule, QueryResolver } from 'nestjs-i18n';
import path = require('path');


@Module({
  imports: [

    ClsModule.forRoot({
      // Register the ClsModule and automatically mount the ClsMiddleware
      global: true,
      middleware: {
        mount: true,
        setup: (cls, req) => {
          const userId = req.headers['x-user-id'];
          const userRole = req.headers['x-user-role'] ?? 'USER';
          cls.set(
            'user',
            userId ? { id: Number(userId), role: userRole } : undefined,
          );
        },
      },
    }),

    /**
     *  PrismaCrudModule registers the PrismaService provider globally.
     *  No need to provide it anywhere else!
     */
      // PrismaCrudModule.register({
      //   prismaService: PrismaService,
      // }),

    ConfigModule.forRoot({
      // envFilePath: '../.development.env', // Look for .env file in the main directory and not in the backend directory
      envFilePath: '.env', // Look for .env file in the main directory
      isGlobal: true, // No need to import ConfigModule in each module
      expandVariables: true, // Allow expanded variable = ${VARIABLE_NAME}
      cache: true, // To accelarate the env variables loading
      validationSchema: Joi.object({
        // NODE_ENV: Joi.string()
        //   .valid('development', 'production', 'test', 'provision')
        //   .default('development'),
        NEST_SERVER_PORT: Joi.number().default(3000),
        JWT_VALIDITY_DURATION: Joi.string().default('240s'),
        }),
      }),
      I18nModule.forRoot({
        fallbackLanguage: 'en',
        fallbacks: {
          'en-CA': 'fr',
          'en-*': 'en',
          'fr-*': 'fr',
          pt: 'pt-BR',
        },
        loader: I18nJsonLoader,
        loaderOptions: {
        path: path.join(__dirname, 'assets/i18n/'),
          watch: true,
        },
        resolvers: [
          { use: QueryResolver, options: ['lang', 'locale', 'l'] },
          new HeaderResolver(['x-custom-lang']),
          AcceptLanguageResolver,
        ],
      }),
      MulterModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          dest: configService.get<string>('FILES_STORAGE_DEST') || './upload',
          limits: {fileSize: configService.get<number>('FILES_MAX_SIZE') || 2000000}
        }),
        inject: [ConfigService],
      }),
      PrismaModule,
      IamModule,
      AuthsModule,
      DbConfigModule,
      FilesModule,
      TimeUtilModule,
      MailsModule,
      CommonModule,
      UsersModule,
      PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CrudMiddleware).forRoutes('/zen');
  }
}

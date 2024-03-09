import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { Public, UserIpInterceptor } from '@my-app/data/common';
import { Auth, AuthType } from '@my-app/data/iam';
import { AppService } from './app.service';

// By mounting the interceptor on the controller, it gets access
// to the same shared cls context that the ClsMiddleware set up.
@UseInterceptors(UserIpInterceptor)

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  /*
  @Public() // from module iam
  @Auth(AuthType.None)
  */
  @Auth(AuthType.None)
  @Get()
  getData() {
    return this.appService.getData();
  }

  @Public()
  @Auth(AuthType.None)
  @Get('/hello')
  hello() {
      return this.appService.sayHello();
  }

}

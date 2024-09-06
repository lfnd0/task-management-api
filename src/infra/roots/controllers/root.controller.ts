import { Controller, Get, Logger } from '@nestjs/common';

@Controller()
export class RootController {
  private readonly logger = new Logger(RootController.name);
  @Get()
  getRoot() {
    const message = 'Welcome To Task Management API';
    this.logger.log(message);

    return {
      message,
    };
  }
}

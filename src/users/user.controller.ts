import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserController {
  @Get('/users')
  rootAPI() {
    return {
      users: [
        {
          name: 'logan',
        },
        { name: 'spencer' },
        { name: 'george' },
      ],
    };
  }
}

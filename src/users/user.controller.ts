import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { users } from 'src/mocks/users';

type UserParams = {
  id: string;
  username: string;
};

type UserQueries = {
  limit: string;
  offset: string;
};

type UserBody = {
  username: string;
};

@Controller('/users')
export class UserController {
  @Get()
  getUsers() {
    return {
      users,
    };
  }

  @Get('/paginated-users')
  getPagedUsers(@Query() queries: UserQueries) {
    const { limit, offset } = queries;

    const limitToNumber = Number(limit);
    const offsetToNumber = Number(offset);

    const start = (offsetToNumber - 1) * limitToNumber;
    const end = start + limitToNumber;

    const paginatedUsers = users.slice(start, end);

    return {
      users: paginatedUsers,
    };
  }

  @Get('/:id')
  getUserById(@Param() params: UserParams) {
    const { id } = params;

    const hasUser = users.find((user) => user.id === id);

    if (hasUser) {
      return {
        user: hasUser,
      };
    }

    return {
      message: 'user not found',
    };
  }

  @Post('/create')
  postUser(@Body() payload: UserBody) {
    const { username } = payload;
    const newUser = {
      id: randomUUID(),
      username,
    };

    users.push(newUser);

    return {
      newUser,
    };
  }
}

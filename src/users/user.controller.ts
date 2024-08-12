import { Controller, Get, Param, Query } from '@nestjs/common';
import { users } from 'src/mocks/users';

type UserParams = {
  id: string;
  username: string;
};

type UserQueries = {
  limit: string;
  offset: string;
};

@Controller()
export class UserController {
  @Get('/users')
  getUsers() {
    return {
      users,
    };
  }

  @Get('/users/paginated-users')
  getPagedUsers(@Query() queries: UserQueries) {
    const { limit, offset } = queries;

    const limitToNumber = Number(limit);
    const offsetToNumber = Number(offset);

    const startIndex = (offsetToNumber - 1) * limitToNumber;
    const endIndex = startIndex + limitToNumber;

    const paginatedUsers = users.slice(startIndex, endIndex);

    return {
      users: paginatedUsers,
    };
  }

  @Get('/users/:id/')
  getUserById(@Param() params: UserParams) {
    const { id } = params;

    return {
      user: users.find((user) => user.id === id) ?? 'user not found',
    };
  }
}

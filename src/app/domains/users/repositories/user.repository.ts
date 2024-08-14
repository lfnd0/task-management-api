import { CreateUserDTO, UserCreatedDTO } from '../dtos/user.dto';

export abstract class IUserRepository {
  abstract findUserByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<UserCreatedDTO | null>;

  abstract createNewUser(data: CreateUserDTO): Promise<void>;
}

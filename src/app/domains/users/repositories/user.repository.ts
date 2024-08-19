import { CreateUserDTO, UserCreatedDTO } from '../dtos/user.dto';

export abstract class IUserRepository {
  abstract findUserByUsername(username: string): Promise<UserCreatedDTO | null>;

  abstract findUserByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<UserCreatedDTO | null>;

  abstract createNewUser(data: CreateUserDTO): Promise<void>;

  abstract findUserById(
    userId: string,
  ): Promise<{ user: Partial<UserCreatedDTO> } | null>;
}

import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDTO } from '../dtos/user.dto';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: CreateUserDTO) {
    const { username, name, email, password } = userData;

    const hasUser = await this.userRepository.findUserByUsernameOrEmail(
      username,
      email,
    );

    if (hasUser) {
      throw new Error('user already exists');
    }

    const passwordHashed = await hash(password, 10);

    await this.userRepository.createNewUser({
      name,
      username,
      email,
      password: passwordHashed,
    });
  }
}

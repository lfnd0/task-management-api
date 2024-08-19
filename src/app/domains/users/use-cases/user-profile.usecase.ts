import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class UserProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string) {
    return await this.userRepository.findUserById(userId);
  }
}

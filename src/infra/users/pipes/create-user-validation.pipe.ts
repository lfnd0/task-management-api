import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/app/domains/users/dtos/user.dto';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  transform(value: CreateUserDTO, metadata: ArgumentMetadata) {
    const { name, username, email, password } = value;

    if (name && username && email && password) {
      return {
        name,
        username,
        email,
        password,
      };
    }

    throw new HttpException('invalid data', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

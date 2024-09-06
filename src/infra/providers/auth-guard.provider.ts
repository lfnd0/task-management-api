import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuardProvider implements CanActivate {
  private readonly logger = new Logger(AuthGuardProvider.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (token) {
      try {
        const verifiedToken = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('JWT_SECRET'),
        });

        request['user'] = verifiedToken;

        return true;
      } catch (error) {
        this.logger.error(error.message);
        throw new UnauthorizedException();
      }
    }

    this.logger.error('token not found');

    throw new UnauthorizedException();
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers.authorization;

    if (authHeader) {
      return authHeader.replace('Bearer ', '');
    }

    return null;
  }
}

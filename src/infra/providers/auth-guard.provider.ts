import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { env } from 'src/env';

@Injectable()
export class AuthGuardProvider implements CanActivate {
  constructor(private jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (token) {
      try {
        const verifiedToken = await this.jwtService.verifyAsync(token, {
          secret: env.JWT_SECRET,
        });

        request['user'] = verifiedToken;

        return true;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }

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

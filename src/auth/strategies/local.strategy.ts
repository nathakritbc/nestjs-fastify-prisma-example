import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(user_username: string, user_password: string): Promise<any> {
    const user = await this.authService.validateUser(
      user_username,
      user_password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

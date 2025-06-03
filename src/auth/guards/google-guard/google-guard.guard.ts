import { GOOGLE_STRATEGY } from '@/constants';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard(GOOGLE_STRATEGY) {
  constructor() {
    super({
      // Google returns a refresh token after successful authentication
      accessType: 'offline',
    });
  }
}

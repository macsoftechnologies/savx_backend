import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      countryCode: user.countryCode,
      mobileNumber: user.mobileNumber,
      role: user.role,
      sessionId: user.sessionId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

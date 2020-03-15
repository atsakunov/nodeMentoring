const jwt = require('jsonwebtoken');

import {
  UserService
} from '../services/userService';

const User = new UserService()

export class AuthController {
  async login(username, password) {
    const user = await User.findBylogin(username);
    if (!user) {
      return null;
    }
    const token = jwt.sign({
        userId: user.id,
      },
      process.env.jwtSecret, {
        expiresIn: '1h'
      }
    );
    return {
      userId: user.id,
      token
    }
  }
}

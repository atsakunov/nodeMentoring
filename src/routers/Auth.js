import {
  Router
} from 'express';
import {
  loginSchema
} from '../utils/validators';
import {
  AuthController
} from '../controllers/authController';
import logger from '../utils/logger';

const authRouter = Router();
const AuthCtrl = new AuthController()

authRouter.route('/login/')
  .post(async (req, res) => {
    try {
      const {
        login,
        password,
      } = req.body;
      const validation = loginSchema.validate({
        login,
        password,
      })
      if (validation.error) {
        logger.log({
          level: 'error',
          url: req.originalUrl,
          error: validation.error,
          params: {
            login,
          }
        })
        return res.status(400).send(validation.error);
      }
      const user = await AuthCtrl.login(login, password);
      if (!user) {
        return res.status(404).send({
          message: `user with login ${login} not found`
        })
      }
      res.json(user);
    } catch (error) {
      logger.log({
        level: 'error',
        url: req.originalUrl,
        error
      })
      res.status(500).json({
        message: 'Server Error'
      });
    }
  })

export {
  authRouter
}

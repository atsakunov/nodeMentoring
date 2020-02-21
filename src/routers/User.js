import {
  Router
} from 'express';
import {
  userSchema
} from '../utils/validators';
import {
  UserController
} from '../controllers/userController';
import logger from '../utils/logger';


const UserCtrl = new UserController();

const userRouter = Router();

userRouter.route('/user/')
  .get(async (req, res) => {
    try {
      const users = await UserCtrl.getAllUsers();
      res.json({
        users
      });
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
  .post(async (req, res) => {
    const {
      login,
      password,
      age
    } = req.body;
    const validation = userSchema.validate({
      login,
      password,
      age
    })
    if (validation.error) {
      logger.log({
        level: 'error',
        url: req.originalUrl,
        error: validation.error,
        params: {
          login,
          age
        }
      })
      return res.status(400).send(validation.error);
    }
    try {
      const user = await UserCtrl.createUser(login, password, age);
      res.status(201).json({
        message: 'User was successfuly created',
        userId: user.id
      });
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
  });


userRouter.route('/user/:id')
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const user = await UserCtrl.getUserById(id);
      if (!user) {
        return res.status(404).send({
          message: `user with id ${id} not found`
        })
      }
      res.status(200).json({
        userId: user,
        message: `Success`
      });
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
  .delete(async (req, res) => {
    try {
      const id = req.params.id;
      const user = UserCtrl.deleteUser(id);

      if (!user) {
        return res.status(404).send({
          message: `user with id ${id} not found`
        })
      }
      res.status(200).json({
        message: `user with id ${id} was deleted`
      });
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
  .put(async (req, res) => {
    try {
      const id = req.params.id;
      const {
        login,
        password,
        age
      } = req.body;
      const validation = userSchema.validate({
        login,
        password,
        age
      })
      if (validation.error) {
        logger.log({
          level: 'error',
          url: req.originalUrl,
          error: validation.error,
          params: {
            login,
            age
          }
        })
        return res.status(400).send(validation.error);
      }
      const user = await UserCtrl.updateUser(id, login, password, age);
      res.status(200).json({
        user,
        message: `user with id ${id} was successfuly updated`
      })
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
  });

export {
  userRouter
}

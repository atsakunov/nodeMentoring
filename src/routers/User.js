import {
  Router
} from 'express';
import {
  userSchema
} from '../utils/validators';
import {
  UserService
} from '../services/userService';
import {
  UserController
} from '../controllers/userController';


const User = new UserService();
const UserCtrl = new UserController();

const userRouter = Router();

userRouter.route('/user/')
  .get(async (req, res) => {
    try {
      const users = await User.getAll();
      res.json({
        users
      });
    } catch (error) {
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
      return res.status(400).send(validation.error);
    }
    try {
      const user = await User.createUser(login, password, age);
      res.status(201).json({
        message: 'User was successfuly created',
        userId: user.id
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error'
      });
    }
  });


userRouter.route('/user/:id')
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
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
        return res.status(400).send(validation.error);
      }
      const user = await User.updateUser(id, login, password, age);
      res.status(200).json({
        user,
        message: `user with id ${id} was successfuly updated`
      })
    } catch (error) {
      res.status(500).json({
        message: 'Server Error'
      });
    }
  });

export {
  userRouter
}

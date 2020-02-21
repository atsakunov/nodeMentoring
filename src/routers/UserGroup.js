import {
  Router
} from 'express';
import {
  UserGroupController
} from '../controllers/userGroupController';
import logger from '../utils/logger';

const UserGroupCtrl = new UserGroupController();

const userGroupRouter = Router();

userGroupRouter.route('/usergroup/')
  .get(async (req, res) => {
    try {
      const userGroups = await UserGroupCtrl.getAllUsers();
      res.json({
        userGroups
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
      userId,
      groupId
    } = req.body;
    try {
      const userGroup = await UserGroupCtrl.addUsersToGroup(userId, groupId);
      if (!userGroup) {
        return res.status(404).send({
          message: `user or group not found`
        })
      }
      res.status(200).json({
        message: 'Role was added',
        ...userGroup
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

export {
  userGroupRouter
}

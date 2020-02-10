import {
  Router
} from 'express';
import {
  UserGroupService
} from '../services/userGroupService';


const UserGroup = new UserGroupService();

const userGroupRouter = Router();

userGroupRouter.route('/usergroup/')
  .get(async (req, res) => {
    try {
      const userGroups = await UserGroup.getAll();
      res.json({
        userGroups
      });
    } catch (error) {
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
      const userGroup = await UserGroup.addUsersToGroup(userId, groupId);
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
      res.status(500).json({
        message: 'Server Error'
      });
    }
  })

export {
  userGroupRouter
}

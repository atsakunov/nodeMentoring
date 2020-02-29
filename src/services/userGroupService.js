import {
  db
} from '../../models';
import logger from '../utils/logger';

export class UserGroupService {

  async getAll() {
    logger.log({
      level: 'info',
      serviceMethod: 'getAll',
    })
    return db.UserGroup.findAll();
  }

  async addUsersToGroup(userId, groupId) {
    logger.log({
      level: 'info',
      serviceMethod: 'addUsersToGroup',
      arguments: [userId, groupId]
    })
    const t = await db.sequelize.transaction();

    try {
      await db.UserGroup.create({
        userId: userId,
        groupId: groupId
      }, {
        transaction: t
      });
      await t.commit();
    } catch (err) {
      await t.rollback();
    }
    return {
      userId,
      groupId
    }
  }

  async deleteByUserId(id) {
    logger.log({
      level: 'info',
      serviceMethod: 'deleteByUserId',
      arguments: [id]
    })
    await db.UserGroup.destroy({
      where: {
        userId: id
      }
    })
  }
}

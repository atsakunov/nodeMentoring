import {
  db
} from '../../models';

export class UserGroupService {

  async getAll() {
    return db.UserGroup.findAll();
  }

  async addUsersToGroup(userId, groupId) {
    const t = await db.sequelize.transaction();
    const user = await db.User.findOne({
      where: {
        id: userId
      }
    });
    const group = await db.Groups.findOne({
      where: {
        id: groupId
      }
    });

    if (!user || !group) {
      return null
    }

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
      user,
      group
    }
  }

  async deleteByUserId(id) {
    await db.UserGroup.destroy({
      where: {
        userId: id
      }
    })
  }
}

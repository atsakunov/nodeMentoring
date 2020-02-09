import {
  db
} from '../../models';



export class UserGroupService {
  async addUsersToGroup(userId, groupId) {
    const t = await sequelize.transaction();
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
    try {
      await db.UserGroup.create({
        userId: user.id,
        groupId: group.id
      }, {
        transaction: t
      });
      await t.commit();
    } catch (err) {
      await t.rollback();
    }
  }
}

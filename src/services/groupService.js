import {
  db
} from '../../models';

export class GroupService {
  getAll() {
    return db.Groups.findAll({
      order: [
        ['id', 'ASC'],
        ['name', 'ASC'],
      ],
    });
  }

  findById(id) {
    return db.Groups.findOne({
      where: {
        id
      },
    });
  }

  createGroup(name, permission) {
    return db.Groups.create({
      name,
      permission,
    });
  }

  async updateGroup(id, name, permission) {
    const group = await db.Groups.findOne({
      where: {
        id
      }
    });


    if (!group) {
      return null;
    }
    this.Group.update({
      name,
      permission,
    }, {
      where: {
        id
      }
    });
    return group;
  }

  async deleteGroup(id) {
    return await db.Groups.destroy({
      where: {
        id
      }
    })
  }
}

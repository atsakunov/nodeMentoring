import {
  db
} from '../../models';
import logger from '../utils/logger';

export class GroupService {
  getAll() {
    logger.log({
      level: 'info',
      serviceMethod: 'getAll',
    })
    return db.Groups.findAll({
      order: [
        ['id', 'ASC'],
        ['name', 'ASC'],
      ],
    });
  }

  findById(id) {
    logger.log({
      level: 'info',
      serviceMethod: 'findById',
      arguments: [id]
    })
    return db.Groups.findOne({
      where: {
        id
      },
    });
  }

  createGroup(name, permission) {
    logger.log({
      level: 'info',
      serviceMethod: 'createGroup',
      arguments: [name, permission]
    })
    return db.Groups.create({
      name,
      permission,
    });
  }

  async updateGroup(id, name, permission) {
    logger.log({
      level: 'info',
      serviceMethod: 'updateGroup',
      arguments: [id, name, permission]
    })
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
    logger.log({
      level: 'info',
      serviceMethod: 'deleteGroup',
      arguments: [id]
    })
    return await db.Groups.destroy({
      where: {
        id
      }
    })
  }
}

export default GroupService;

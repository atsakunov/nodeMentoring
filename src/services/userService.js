import {
  db
} from '../../models';
import logger from '../utils/logger';

export class UserService {
  async getAll() {
    logger.log({
      level: 'info',
      serviceMethod: 'getAll',
    })
    return db.User.findAll();
  }

  createUser(login, password, age) {
    logger.log({
      level: 'info',
      serviceMethod: 'createUser',
      arguments: [login, password, age]
    })
    return db.User.create({
      login,
      password,
      age,
      isDeleted: false
    });
  }
  findById(id) {
    logger.log({
      level: 'info',
      serviceMethod: 'findById',
      arguments: [id]
    })
    return db.User.findOne({
      where: {
        id
      }
    });
  }
  async findBylogin(login) {
    logger.log({
      level: 'info',
      serviceMethod: 'findBylogin',
      arguments: [login]
    })
    return db.User.findOne({
      where: {
        login
      }
    });
  }
  deleteUser(id) {
    logger.log({
      level: 'info',
      serviceMethod: 'deleteUser',
      arguments: [id]
    })
    db.User.update({
      isDeleted: true
    }, {
      where: {
        id
      }
    });
  }

  updateUser(id, login, password, age) {
    logger.log({
      level: 'info',
      serviceMethod: 'updateUser',
      arguments: [id, login, password, age]
    })
    return db.User.update({
      login,
      password,
      age
    }, {
      where: {
        id
      }
    });
  }
}

export default UserService;

import {
  db
} from '../../models';


export class UserService {
  async getAll() {
    return db.User.findAll();
  }

  createUser(login, password, age) {
    return db.User.create({
      login,
      password,
      age,
      isDeleted: false
    });
  }
  findById(id) {
    return db.User.findOne({
      where: {
        id
      }
    });
  }
  deleteUser(id) {
    return db.User.update({
      isDeleted: true
    }, {
      where: {
        id
      }
    });
  }
  updateUser(id, login, password, age) {
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

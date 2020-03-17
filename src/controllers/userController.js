import {
  UserGroupService
} from '../services/userGroupService';

const UserGroup = new UserGroupService();

export class UserController {
  constructor(User) {
    this.User = User;
  }

  async deleteUser(id) {
    const user = await this.User.findById(id);
    if (!user) {
      return null;
    }
    await this.User.deleteUser(id);
    await UserGroup.deleteByUserId(id);
    return true;
  }
  async getAllUsers() {
    const users = await this.User.getAll();
    return users;
  }
  async createUser(login, password, age) {
    const user = await this.User.createUser(login, password, age);
    return user;
  }
  async getUserById(id) {
    const user = await this.User.findById(id);
    return user;
  }
  async updateUser(id, login, password, age) {
    const user = await this.User.updateUser(id, login, password, age);
    return user;
  }
}

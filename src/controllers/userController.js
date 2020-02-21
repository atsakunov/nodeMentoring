import {
  UserService
} from '../services/userService';
import {
  UserGroupService
} from '../services/userGroupService';

const User = new UserService();
const UserGroup = new UserGroupService();

export class UserController {
  async deleteUser(id) {
    const user = await User.findById(id);
    if (!user) {
      return null;
    }
    await User.deleteUser(id);
    await UserGroup.deleteByUserId(id);
  }
  async getAllUsers() {
    const users = await User.getAll();
    return users;
  }
  async createUser(login, password, age) {
    const user = await User.createUser(login, password, age);
    return user;
  }
  async getUserById(id) {
    const user = await User.findById(id);
    return user;
  }
  async updateUser(id, login, password, age) {
    const user = await User.updateUser(id, login, password, age);
    return user;
  }
}

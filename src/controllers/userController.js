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
}

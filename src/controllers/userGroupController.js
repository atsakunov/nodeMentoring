import {
  UserService
} from '../services/userService';
import {
  UserGroupService
} from '../services/userGroupService';
import {
  GroupService
} from '../services/groupService';

const User = new UserService();
const Group = new GroupService();
const UserGroup = new UserGroupService();

export class UserGroupController {
  async getAllUsers() {
    const usersGroups = await UserGroup.getAll();
    return usersGroups;
  }
  async addUsersToGroup(userId, groupId) {
    const user = await User.findById(userId);
    const group = await Group.findById(groupId)

    if (!user || !group) {
      return null
    }
    const userGroup = await UserGroup.addUsersToGroup(user.id, group.id);
    return userGroup
  }
}

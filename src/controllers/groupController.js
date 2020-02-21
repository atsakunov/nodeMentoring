import {
  GroupService
} from '../services/groupService';
import {
  UserGroupService
} from '../services/userGroupService';

const Group = new GroupService();
const UserGroup = new UserGroupService();

export class GroupController {
  async deleteGroup(id) {
    const group = await Group.findById(id);
    if (!group) {
      return null;
    }
    await Group.deleteGroup(id);
    await UserGroup.deleteByUserId(id);
    return group;
  }
}

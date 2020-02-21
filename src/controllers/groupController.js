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
  async getAllGroup() {
    const groups = await Group.getAll();
    return groups;
  }
  async createGroup(name, permission) {
    const groups = await Group.createGroup(name, permission);
    return groups;
  }
  async getGroupById(id) {
    const group = await Group.findById(id);
    return group;
  }
  async updateGroup(id, name, permission) {
    const group = await Group.findById(id);

    if (!group) {
      return null;
    }
    const updatedGroup = await Group.updateGroup(id, name, permission);
    return updatedGroup;
  }
}

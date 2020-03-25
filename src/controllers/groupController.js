import {
  GroupService
} from '../services/groupService';
import {
  UserGroupService
} from '../services/userGroupService';


const Group = new GroupService();
const UserGroup = new UserGroupService();

export class GroupController {
  constructor(Group) {
    this.Group = Group;
  }

  async deleteGroup(id) {
    const group = await this.Group.findById(id);
    if (!group) {
      return null;
    }
    await this.Group.deleteGroup(id);
    await UserGroup.deleteByUserId(id);
    return group;
  }
  async getAllGroup() {
    const groups = await this.Group.getAll();
    return groups;
  }
  async createGroup(name, permission) {
    const groups = await this.Group.createGroup(name, permission);
    return groups;
  }
  async getGroupById(id) {
    const group = await this.Group.findById(id);
    return group;
  }
  async updateGroup(id, name, permission) {
    const group = await this.Group.findById(id);

    if (!group) {
      return null;
    }
    const updatedGroup = await this.Group.updateGroup(id, name, permission);
    return updatedGroup;
  }
}

import {
  GroupController
} from '../../src/controllers/groupController';
import {
  GroupService
} from '../../src/services/groupService';

jest.mock('../../src/services/groupService');
jest.mock('../../src/services/userGroupService');

describe('group constroller', () => {
  let Group = null;
  let groupCtrl = null;
  let GROUPS = [];
  let getAllSpy = null;
  let findByIdSpy = null;
  let deleteGroupSpy = null;
  let createGroupSpy = null;
  let updateGroupSpy = null;

  beforeAll(() => {
    Group = new GroupService();
    groupCtrl = new GroupController(Group);
  });

  beforeEach(() => {
    GROUPS = [{
        id: '1',
        name: 'Admin',
        permission: ['READ', 'WRITE', 'UPLOAD_FILES'],
      },
      {
        id: '2',
        name: 'User',
        permission: ['Read', 'UPLOAD_FILES'],
      },
      {
        id: '3',
        name: 'User2',
        permission: ['Read', 'UPLOAD_FILES'],
      },
      {
        id: '4',
        name: 'User3',
        permission: ['Read', 'UPLOAD_FILES'],
      }
    ]

    getAllSpy = jest.fn(() => GROUPS);
    jest
      .spyOn(Group, 'getAll')
      .mockImplementation(() => getAllSpy());


    findByIdSpy = jest.fn((id) => {
      const group = GROUPS.filter(item => item.id === id)[0];
      return group ? group : null;
    })

    jest
      .spyOn(Group, 'findById')
      .mockImplementation((id) => findByIdSpy(id));

    deleteGroupSpy = jest.fn((id) => GROUPS.find(item => item.id === id));
    jest
      .spyOn(Group, 'deleteGroup')
      .mockImplementation((id) => deleteGroupSpy(id));

    createGroupSpy = jest.fn((name, permission) => ({
      name,
      permission
    }));
    jest
      .spyOn(Group, 'createGroup')
      .mockImplementation((name, permission) => createGroupSpy(name, permission));

    updateGroupSpy = jest.fn((id, name, permission) => ({
      id,
      name,
      permission
    }));
    jest
      .spyOn(Group, 'updateGroup')
      .mockImplementation((id, name, permission) => updateGroupSpy(id, name, permission));
  });

  it('Should return all groups.', async () => {
    const allGroups = await groupCtrl.getAllGroup();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(allGroups).toEqual(GROUPS);
  });

  it('Should delete exsist group.', async () => {
    const id = '3';

    const isDeleted = await groupCtrl.deleteGroup(id);
    const deletedGroup = GROUPS.find(item => item.id === id);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith(id);
    expect(deleteGroupSpy).toHaveBeenCalledTimes(1);
    expect(isDeleted).toBeTruthy();
    expect(isDeleted).toEqual(deletedGroup);
  });

  it('Should delete no exsist group.', async () => {
    const id = '33';

    const isDeleted = await groupCtrl.deleteGroup(id);

    expect(findByIdSpy).toHaveBeenCalledWith(id);
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(isDeleted).toBeNull();
  });

  it('Should create group.', async () => {
    const name = 'User33';
    const permission = ['Read', 'UPLOAD_FILES'];

    const group = await groupCtrl.createGroup(name, permission);

    expect(createGroupSpy).toHaveBeenCalledTimes(1);
    expect(createGroupSpy).toHaveBeenCalledWith(name, permission);
    expect(group.name).toBe('User33');
    expect(group.permission).toEqual(permission);
  });

  it('Should find exist group by id.', async () => {
    const id = '3';
    const groupToFind = GROUPS.find(item => item.id === id);
    const group = await groupCtrl.getGroupById(id);

    expect(findByIdSpy).toHaveBeenCalledWith(id);
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(group).toEqual(groupToFind);
  });

  it('Should find no exist group by id.', async () => {
    const id = '33';
    const group = await groupCtrl.getGroupById(id);

    expect(findByIdSpy).toHaveBeenCalledWith(id);
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(group).toBeNull();
  });

  it('Should update exist group.', async () => {
    const id = '3';
    const name = 'User33';
    const permission = ['Read', 'UPLOAD_FILES'];

    const group = await groupCtrl.updateGroup(id, name, permission);

    expect(updateGroupSpy).toHaveBeenCalledWith(id, name, permission);
    expect(updateGroupSpy).toHaveBeenCalledTimes(1);
    expect(group.name).toBe('User33');
    expect(group.permission).toEqual(permission);
  });

  it('Should update no exist group.', async () => {
    const id = '33';
    const name = 'User33';
    const permission = ['Read', 'UPLOAD_FILES'];

    const group = await groupCtrl.updateGroup(id, name, permission);

    expect(findByIdSpy).toHaveBeenCalledWith(id);
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(group).toBeNull();
  });

});

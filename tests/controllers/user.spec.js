import {
  UserController
} from '../../src/controllers/userController';
import {
  UserService
} from '../../src/services/userService';

jest.mock('../../src/services/userService');
jest.mock('../../src/services/userGroupService');

describe('user constroller', () => {
  let User = null;
  let userCtrl = null;
  let USERS = [];
  let findByIdSpy = null;
  let deleteUserSpy = null;
  let getAllSpy = null;
  let createUserSpy = null;
  let updateUserSpy = null;

  beforeAll(() => {
    User = new UserService()
    userCtrl = new UserController(User);
  });

  beforeEach(() => {
    USERS = [{
      id: '1',
      login: 'Nick',
      password: '123',
      isDeleted: false
    }, {
      id: '2',
      login: 'Mary',
      password: '123',
      isDeleted: false
    }, {
      id: '3',
      login: 'Olga',
      password: '123',
      isDeleted: false
    }, {
      id: '4',
      login: 'Mike',
      password: '123',
      isDeleted: false
    }, ]

    getAllSpy = jest.fn(() => USERS);
    jest
      .spyOn(User, 'getAll')
      .mockImplementation(() => getAllSpy());


    findByIdSpy = jest.fn((id) => {
      const user = USERS.filter(item => item.id === id)[0];
      return user ? user : null;
    })

    jest
      .spyOn(User, 'findById')
      .mockImplementation((id) => findByIdSpy(id));

    deleteUserSpy = jest.fn((id) => USERS.find(item => item.id === id).isDeleted = true);
    jest
      .spyOn(User, 'deleteUser')
      .mockImplementation((id) => deleteUserSpy(id));

    createUserSpy = jest.fn((login, password, age) => ({
      login,
      password,
      age
    }));
    jest
      .spyOn(User, 'createUser')
      .mockImplementation((login, password, age) => createUserSpy(login, password, age));

    updateUserSpy = jest.fn((id, login, password, age) => ({
      id,
      login,
      password,
      age
    }));
    jest
      .spyOn(User, 'updateUser')
      .mockImplementation((id, login, password, age) => updateUserSpy(id, login, password, age));
  });

  it('Should return all users.', async () => {

    const allUsers = await userCtrl.getAllUsers();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    // expect(SPY).toHaveBeenCalledWith(USERS);
    expect(allUsers).toEqual(USERS);

  });

  it('Should delete exsist user.', async () => {
    const id = '3';

    const isDeleted = await userCtrl.deleteUser(id);
    const deletedUser = USERS.find(item => item.id === id);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith(id);
    expect(deleteUserSpy).toHaveBeenCalledTimes(1);
    expect(isDeleted).toBeTruthy();
    expect(deletedUser.isDeleted).toBeTruthy();
  });

  it('Should delete no exsist user.', async () => {
    const id = '33';

    const isDeleted = await userCtrl.deleteUser(id);

    expect(findByIdSpy).toHaveBeenCalledWith(id);
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(isDeleted).toBeNull();
  });

  it('Should create user.', async () => {
    const login = 'Alex';
    const password = '133';
    const age = 33;

    const user = await userCtrl.createUser(login, password, age);

    expect(createUserSpy).toHaveBeenCalledTimes(1);
    expect(createUserSpy).toHaveBeenCalledWith(login, password, age);
    expect(user.login).toBe(login);
    expect(user.password).toBe(password);
    expect(user.age).toBe(age);
  });

  it('Should find exist user by id.', async () => {
    const id = '3';
    const userToFind = USERS.find(item => item.id === id);

    const user = await userCtrl.getUserById(id);

    expect(findByIdSpy).toHaveBeenCalledWith(id);
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(user).toEqual(userToFind);
  });

  it('Should find no exist user by id.', async () => {
    const id = '33';
    const user = await userCtrl.getUserById(id);

    expect(findByIdSpy).toHaveBeenCalledWith(id);
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(user).toBeNull();
  });

  it('Should update exist user.', async () => {
    const id = '3';
    const login = 'Alex';
    const password = '133';
    const age = 33;

    const user = await userCtrl.updateUser(id, login, password, age);

    expect(updateUserSpy).toHaveBeenCalledWith(id, login, password, age);
    expect(updateUserSpy).toHaveBeenCalledTimes(1);
    expect(user.login).toBe(login);
    expect(user.password).toBe(password);
    expect(user.age).toBe(age);
  });

});

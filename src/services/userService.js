import {
    db
} from '../../models';


export class UserService {

    constructor() {
        this.User = db.User;
    }

    getAll() {
        return this.User.findAll();
    }

    createUser(login, password, age) {
        return this.User.create({
            login,
            password,
            age,
            isDeleted: false
        });
    }
    findById(id) {
        return this.User.findOne({
            where: {
                id
            }
        });
    }
    deleteUser(id) {
        return this.User.update({
            isDeleted: true
        }, {
            where: {
                id
            }
        });
    }
    updateUser(id, login, password, age) {
        return this.User.update({
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
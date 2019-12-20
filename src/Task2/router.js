import {
    Router
} from 'express';
import {
    userSchema
} from './validations';

import storage from './storage';
const router = Router();

router.route('/user/')
    .get((req, res) => {
        res.json(storage.getAll());
    })
    .post((req, res) => {
        const {
            login,
            password,
            age
        } = req.body;
        const validation = userSchema.validate({
            login,
            password,
            age
        })
        if (validation.error) {
            res.status(400).send(validation.error);
        }
        storage.createUser(login, password, age);
        res.status(200).send('User was successfuly created');
    });


router.route('/user/:id')
    .get((req, res) => {
        const id = req.params.id;
        const data = storage.getItemById(id);
        if (!data.id) {
            res.status(404).send({
                ...data,
                message: `user with id ${id} not found`
            })
        }
        res.status(200).send({
            ...data,
            message: `Success`
        });
    })
    .delete((req, res) => {
        const id = req.params.id;
        const data = storage.removeItem(id);
        if (!data.id) {
            res.status(404).send({
                ...data,
                message: `user with id ${id} not found`
            })
        }
        res.status(200).send({
            ...data,
            message: `user with id ${id} was deleted`
        });
    })
    .put((req, res) => {
        const id = req.params.id;
        const {
            login,
            password,
            age
        } = req.body;
        const validation = userSchema.validate({
            login,
            password,
            age
        })
        if (validation.error) {
            res.status(400).send(validation.error);
        }
        const updatedItem = storage.updateUser(id, login, password, age);
        if (!updatedItem.id) {
            res.status(404).send({
                message: `user with id ${id} not found`
            })
        }
        res.status(404).send({
            message: `user with id ${id} was successfuly updated`
        })
    });

router.get('/suggest/', (req, res) => {
    const {
        substring,
        limit
    } = req.query;
    res.json(storage.getAutoSuggestUsers(substring, limit));
});

export {
    router
}
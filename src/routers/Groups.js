import {
  Router
} from 'express';
import {
  GroupService
} from '../services/groupService';
import {
  groupSchema
} from '../utils/validators';
import {
  GroupController
} from '../controllers/groupController'

const groupRouter = Router();

const Group = new GroupService();
const GroupCtrl = new GroupController();

groupRouter.route('/group/')
  .get(async (req, res) => {
    try {
      const groups = await Group.getAll();
      res.json(groups);
    } catch (error) {
      res.status(500).json({
        message: 'Server Error'
      });
    }
  })
  .post(async (req, res) => {
    const {
      name,
      permission,
    } = req.body;
    const validation = groupSchema.validate({
      name,
      permission,
    })
    if (validation.error) {
      return res.status(400).send(validation.error);
    }
    try {
      const group = await Group.createGroup(name, permission);
      res.status(201).json({
        message: 'Group was successfuly created',
        groupId: group.id
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error'
      });
    }
  });

groupRouter.route('/group/:id')
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const group = await Group.findById(id);
      if (!group) {
        return res.status(404).send({
          message: `group with id ${id} not found`
        })
      }
      res.status(200).json({
        group,
        message: `Success`
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error'
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const id = req.params.id;
      const group = await GroupCtrl.deleteGroup(id);
      if (!group) {
        return res.status(404).send({
          message: `group with id ${id} not found`
        })
      }
      res.status(200).json({
        group,
        message: `group with id ${id} successfuly deleted`
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error'
      });
    }
  })
  .put(async (req, res) => {
    try {
      const id = req.params.id;
      const {
        name,
        permission,
      } = req.body;
      const validation = groupSchema.validate({
        name,
        permission,
      })
      if (validation.error) {
        return res.status(400).send(validation.error);
      }
      const group = await Group.updateGroup(id, name, permission);
      if (!group) {
        return res.status(404).send({
          message: `group with id ${id} not found`
        })
      }
      res.status(200).json({
        group,
        message: `user with id ${id} was successfuly updated`
      })
    } catch (error) {
      res.status(500).json({
        message: 'Server Error'
      });
    }
  });

export {
  groupRouter
}

import {
  Router
} from 'express';
import {
  groupSchema
} from '../utils/validators';
import {
  GroupController
} from '../controllers/groupController';
import logger from '../utils/logger';

const groupRouter = Router();

const GroupCtrl = new GroupController();

groupRouter.route('/group/')
  .get(async (req, res) => {
    try {
      const groups = await GroupCtrl.getAllGroup();
      res.json(groups);
    } catch (error) {
      logger.log({
        level: 'error',
        url: req.originalUrl,
        error
      })
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
      logger.log({
        level: 'error',
        url: req.originalUrl,
        error: validation.error,
        params: {
          name,
          permission
        }
      })
      return res.status(400).send(validation.error);
    }
    try {
      const group = await GroupCtrl.createGroup(name, permission);
      res.status(201).json({
        message: 'Group was successfuly created',
        groupId: group.id
      });
    } catch (error) {
      logger.log({
        level: 'error',
        url: req.originalUrl,
        error
      })
      res.status(500).json({
        message: 'Server Error'
      });
    }
  });

groupRouter.route('/group/:id')
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const group = await GroupCtrl.getGroupById(id);
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
      logger.log({
        level: 'error',
        url: req.originalUrl,
        error
      })
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
      logger.log({
        level: 'error',
        url: req.originalUrl,
        error
      })
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
        logger.log({
          level: 'error',
          url: req.originalUrl,
          error: validation.error,
          params: {
            name,
            permission
          }
        })
        return res.status(400).send(validation.error);
      }
      const group = await GroupCtrl.updateGroup(id, name, permission);
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
      logger.log({
        level: 'error',
        url: req.originalUrl,
        error
      })
      res.status(500).json({
        message: 'Server Error'
      });
    }
  });

export {
  groupRouter
}

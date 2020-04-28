import express from 'express';
import todoController from './todo.controller';
import errorMiddleware from '../../middlewares/errors';
import validationMiddleware from '../../middlewares/validation';
import ToDoSchema from './todo.validation';

const router = express.Router();

/**
 * @api {get} get index
 * @APIGroup 1
 * @apiDescription Some documenting a route
 */
router.route('/').get((req, res) => {
  res.status(200).send({ message: 'Minimal boilerplate in express' });
});

router
  .route('/todos')
  .get(todoController.getAll)
  .post(validationMiddleware.validate({ action: 'POST' }, ToDoSchema), todoController.add)
  .all(errorMiddleware.allowOnly(['GET', 'POST']));

router
  .route('/todos/:todoId')
  .get(todoController.get)
  .put(validationMiddleware.validate({ action: 'PUT' }, ToDoSchema), todoController.update)
  .delete(todoController.delete)
  .all(errorMiddleware.allowOnly(['GET', 'PUT', 'DELETE']));

module.exports = router;

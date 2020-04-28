import { SuccessResponse, CreatedResponse } from '../models/Response.model';
import Todo from './Todo.model';

exports.add = (req, res, next) => {
  const todo = new Todo(req.body).save();
  const response = new CreatedResponse('Todos', todo);
  res.status(response.status).send(response.toString());
};

exports.get = (req, res, next) => {
  const { todoId } = req.params;
  const response = new SuccessResponse('Todos', Todo.findOne(todoId));
  res.status(response.status).send(response.toString());
};

exports.getAll = (req, res, next) => {
  const results = Todo.findAll();
  const response = new SuccessResponse('Todos', results);
  res.status(response.status).send(response.toString());
};

exports.update = (req, res, next) => {
  const { todoId } = req.params;
  const payload = req.body;
  const response = new SuccessResponse('Todos', Todo.update(todoId, payload));
  res.status(response.status).send(response.toString());
};

exports.delete = (req, res, next) => {
  const { todoId } = req.params;
  const response = new SuccessResponse('Todos', Todo.delete(todoId));
  res.status(response.status).send(response.toString());
};

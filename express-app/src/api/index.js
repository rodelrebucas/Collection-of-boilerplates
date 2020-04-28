import express from 'express';
import todo from './todo/todo.route';

const router = express.Router();

router.use(todo);

module.exports = router;

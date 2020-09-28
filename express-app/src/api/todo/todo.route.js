import express from "express";
import { get, getAll, add, update, remove } from "./todo.controller";
import errorMiddleware from "../../middlewares/errors";
import validationMiddleware from "../../middlewares/validation";
import ToDoSchema from "./todo.validation";

const router = express.Router();

/**
 * @api {get} get index
 * @APIGroup 1
 * @apiDescription Some documenting a route
 */
router.route("/").get((req, res) => {
  res.status(200).send({ message: "Minimal boilerplate in express" });
});

router
  .route("/todos")
  .get(getAll)
  .post(
    validationMiddleware.validate({ action: "POST" }, ToDoSchema),
    add
  )
  .all(errorMiddleware.allowOnly(["GET", "POST"]));

router
  .route("/todos/:todoId")
  .get(get)
  .put(
    validationMiddleware.validate({ action: "PUT" }, ToDoSchema),
    update
  )
  .delete(remove)
  .all(errorMiddleware.allowOnly(["GET", "PUT", "DELETE"]));

module.exports = router;

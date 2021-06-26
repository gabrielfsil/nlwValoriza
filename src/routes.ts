import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagController } from "./controllers/ListTagController";
import { ListUserController } from "./controllers/ListUserController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/LIstUserSendComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticate } from "./middlewares/ensureAuthenticate";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();
const listUserSendComplimentController =
  new ListUserSendComplimentsController();
const listTagController = new ListTagController();
const listUserController = new ListUserController();

router.post("/users", createUserController.handle);

router.get("/users", ensureAuthenticate, listUserController.handle);

router.post(
  "/tags",
  ensureAuthenticate,
  ensureAdmin,
  createTagController.handle
);

router.get("/tags", ensureAuthenticate, listTagController.handle);

router.post("/login", authenticateUserController.handle);

router.post(
  "/compliments",
  ensureAuthenticate,
  createComplimentController.handle
);

router.get(
  "/users/compliments/send",
  ensureAuthenticate,
  listUserSendComplimentController.handle
);
router.get(
  "/users/compliments/receive",
  ensureAuthenticate,
  listUserReceiveComplimentsController.handle
);

export { router };

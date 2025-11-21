import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);
router.post(
    "/",
    commonMiddleware.isBodyValid(UserValidator.create),
    userController.create,
);
router.get("/:id", commonMiddleware.isIdValid("id"), userController.getById);
router.put(
    "/:id",
    commonMiddleware.isIdValid("id"),
    commonMiddleware.isBodyValid(UserValidator.update),
    userController.updateById,
);
router.delete("/:id", commonMiddleware.isIdValid("id"), userController.delete);

export const userRouter = router;

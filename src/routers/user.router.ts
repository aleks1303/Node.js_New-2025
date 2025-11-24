import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", commonMiddleware.isIdValid("id"), userController.getById);
router.put(
    "/:id",
    commonMiddleware.isIdValid("id"),
    commonMiddleware.isBodyValid(UserValidator.update),
    authMiddleware.checkAccessToken,
    userController.updateById,
);
router.delete(
    "/:id",
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken,
    userController.delete,
);

export const userRouter = router;

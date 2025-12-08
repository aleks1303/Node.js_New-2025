import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AuthValidator } from "../validators/auth.validator";
import { RecoveryValidator } from "../validators/recovery.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.isBodyValid(UserValidator.create),
    authController.signUp,
);

router.post(
    "/sign-in",
    commonMiddleware.isBodyValid(UserValidator.signIn),
    authController.signIn,
);

router.post(
    "/refresh",
    commonMiddleware.isBodyValid(AuthValidator.refreshToken),
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

router.get("/me", authMiddleware.checkAccessToken, authController.me);

router.patch("/activate/:token", authController.activate);

router.post(
    "/recovery",
    commonMiddleware.isBodyValid(RecoveryValidator.emailSchema),
    authController.passwordRecoveryRequest,
);
router.post(
    "/recovery/:token",
    commonMiddleware.isBodyValid(AuthValidator.validatorPassword),
    authController.recoveryPassword,
);
export const authRouter = router;

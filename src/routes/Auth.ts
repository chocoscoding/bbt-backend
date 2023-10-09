import { Router } from "express";
import { managerLogin, managerSignup, userLogin, userResetpassword, userSignup } from "../controllers/AuthController";
import { handleInputError } from "../middleware/ErrorHandler";
import { loginMiddleware, resetPasswordMiddleware, signupMiddleware } from "../middleware/InputMiddlewareChaining";
import { protectedRoute, protectedRouteForManagers } from "../middleware/ProtectedRoute";

const router = Router();

router.post("/user/signup", signupMiddleware, userSignup);
router.post("/user/login", loginMiddleware, userLogin);
router.post("/user/resetpassword", protectedRoute, resetPasswordMiddleware, userResetpassword);
router.post("/manager/signup", managerSignup);
router.post("/manager/login", loginMiddleware, managerLogin);
router.post("/manager/resetpassword", protectedRoute, protectedRouteForManagers, resetPasswordMiddleware, userResetpassword);

router.use(handleInputError);
export default router;

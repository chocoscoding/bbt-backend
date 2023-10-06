import { Router } from "express";
import { managerLogin, managerSignup, userLogin, userResetpassword, userSignup } from "../controllers/AuthController";
import { handleInputError } from "../middleware/ErrorHandler";
import { loginMiddleware, resetPasswordMiddleware, signupMiddleware } from "../middleware/InputMiddlewareChaining";
import { protectedRoute } from "../middleware/ProtectedRoute";
import { Express } from "express";

const router = Router();

router.post("/user/signup", signupMiddleware, userSignup);
router.post("/user/login", loginMiddleware, userLogin);
router.post("/user/resetpassword", protectedRoute, resetPasswordMiddleware, userResetpassword);
router.post("/manager/signup", managerSignup);
router.post("/manager/login", loginMiddleware, managerLogin);
router.post("/manager/resetpassword", (req, res) => {
  res.send("login");
});

router.use(handleInputError);
export default router;

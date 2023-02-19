import { Router } from "express";
import UserController from "../controllers/UserController";
import { check } from "express-validator";

const router = Router();

router.post('/register', [
  check("email", "Invalid email.").isEmail()
], UserController.register)
router.post('/login', UserController.login)
router.get('/users', UserController.getUsers)

export default router;
import { Router } from "express";
import { emailController, getBlog } from "./controller.js";

const router = Router()

router.post('/sendEmail',emailController)
router.get('/getBlog',getBlog)

export default router; // export router. 
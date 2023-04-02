import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import appointmentController from "../controllers/appointmentController.js";

const appointmentRouter = Router();

appointmentRouter.get("/:doctorId/:date", authMiddleware.validateCredentials("patients"), appointmentController.getFreeAppoitments);

export default appointmentRouter;
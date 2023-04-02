import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import appointmentController from "../controllers/appointmentController.js";
import appointmentMiddleware from "../middlewares/appointmentMiddleware.js";

const appointmentRouter = Router();

appointmentRouter.get(
	"/:doctorId/:date",
	authMiddleware.validateCredentials("patients"),
	appointmentController.getFreeAppoitments
);
appointmentRouter.post(
	"/:doctorId/:date/:time",
	authMiddleware.validateCredentials("patients"),
	appointmentMiddleware.checkConflict,
	appointmentController.scheduleAppointment
);

export default appointmentRouter;

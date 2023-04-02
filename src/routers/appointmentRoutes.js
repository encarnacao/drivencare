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

appointmentRouter.get(
	"/:doctorId",
	authMiddleware.validateCredentials("patients"),
	appointmentController.getFutureFreeTimes
);

appointmentRouter.post(
	"/:doctorId/:date/:time",
	authMiddleware.validateCredentials("patients"),
	appointmentMiddleware.checkConflict,
	appointmentController.scheduleAppointment
);

appointmentRouter.post(
	"/:appointmentId/:status",
	authMiddleware.validateCredentials("doctors"),
	appointmentMiddleware.checkStatus,
	appointmentMiddleware.checkAppointment,
	appointmentController.updateAppointmentStatus
);

export default appointmentRouter;

import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidation.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import authController from "../controllers/authController.js";
import doctorSchema from "../schemas/doctorSchema.js";
import doctorControllers from "../controllers/doctorControllers.js";
import doctorMiddleware from "../middlewares/doctorMiddleware.js";

const doctorRouter = Router();

doctorRouter.get(
	"/",
	authMiddleware.validateCredentials("patients"),
	doctorControllers.get
);

doctorRouter.post(
	"/signup",
	validateSchema(doctorSchema),
	doctorMiddleware.checkConflict,
	authMiddleware.checkConflicts("doctors"),
	doctorControllers.create
);

doctorRouter.post("/signin", authController.signin("doctors"));

doctorRouter.get(
	"/appointments",
	authMiddleware.validateCredentials("doctors"),
	doctorControllers.getAppointments
);

doctorRouter.get(
	"/appointments/history",
	authMiddleware.validateCredentials("doctors"),
	doctorControllers.getHistory
);

export default doctorRouter;

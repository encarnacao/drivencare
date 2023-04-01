import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidation.js";
import patientSchema from "../schemas/patientSchema.js";
import patientControllers from "../controllers/patientControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import authController from "../controllers/authController.js";

const patientRouter = Router();

patientRouter.post(
	"/signup",
	validateSchema(patientSchema),
	authMiddleware.checkConflicts("patients"),
	patientControllers.create
);

patientRouter.post("/signin", authController.signin("patients"));

export default patientRouter;

import { Router } from 'express';
import { validateSchema } from '../middlewares/schemaValidation.js';
import patientSchema from '../schemas/patientSchema.js';
import patientControllers from '../controllers/patientControllers.js';

const patientRouter = Router();

patientRouter.post("/signup", validateSchema(patientSchema),patientControllers.create);

export default patientRouter;
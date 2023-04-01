import { Router } from "express";
import patientRouter from "./patientRoutes.js";

const routes = Router();

routes.use("/patients", patientRouter);

export default routes;
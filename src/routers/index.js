import { Router } from "express";
import doctorRouter from "./doctorRoutes.js";
import patientRouter from "./patientRoutes.js";

const routes = Router();

routes.use("/patients", patientRouter);
routes.use("/doctors", doctorRouter);

export default routes;
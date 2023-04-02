import { Router } from "express";
import appointmentRouter from "./appointmentRoutes.js";
import doctorRouter from "./doctorRoutes.js";
import patientRouter from "./patientRoutes.js";

const routes = Router();

routes.use("/patients", patientRouter);
routes.use("/doctors", doctorRouter);
routes.use("/appointments", appointmentRouter);

export default routes;

import "express-async-errors";
import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routers/index.js";
import { handleApplicationErrors } from "./middlewares/errorMiddleware.js";
import sendEmails from "./scripts/emailSender.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(routes);
app.use(handleApplicationErrors);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	setInterval(sendEmails, 1000 * 60 * 60 * 24);
});

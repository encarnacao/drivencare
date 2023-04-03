import nodemailer from "nodemailer";
import appoitmentRepository from "../repositories/appoitmentRepository.js";
import moment from "moment";
import dotenv from "dotenv";

dotenv.config();

async function sendEmails() {
	const transporterConfig = {
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	};

	const appointments = await appoitmentRepository.getTodayAppointments();
	const transporter = nodemailer.createTransport(transporterConfig);
	appointments.forEach(async (appointment) => {
		const message = {
			from: process.env.EMAIL_USER,
			to: appointment.email,
			subject: "Appointment reminder",
			text: `Hello ${
				appointment.patient
			}, you have an appointment today at ${moment(
				appointment.time
			).format("HH:mm")}. See you soon!`,
			html: `<p>Hello ${
				appointment.patient
			}, you have an appointment today at ${moment(
				appointment.time
			).format("HH:mm")}.</p>
                <p>See you soon!</p>`,
		};
		await transporter.sendMail(message);
	});
}

export default sendEmails;

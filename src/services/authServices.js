import authRepository from "../repositories/authRepository.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import errors from "../errors/index.js";

dotenv.config();

async function signin(email, password, table) {
	const user = await authRepository.searchEmail(email, table);
	if (user.length === 0) throw errors.invalidCredentialsError();
	const isPasswordCorrect = await bcrypt.compare(password, user[0].password);
    if(!isPasswordCorrect) throw errors.invalidCredentialsError();
    const token = jwt.sign({ email: user[0].email }, process.env.JWT_SECRET);
    return token;
}

export default { signin };
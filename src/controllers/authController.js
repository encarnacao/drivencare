import errors from "../errors/index.js";
import authRepository from "../repositories/authRepository.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

function signin(table){
    return async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) throw errors.badRequestError("Email and password are required");
        try {
            const user = await authRepository.searchEmail(email, table);
            const isPasswordCorrect = await bcrypt.compare(password, user[0]?.password);
            if(!isPasswordCorrect || user.length === 0) throw errors.invalidCredentialsError();
            const token = jwt.sign({ email: user[0].email }, process.env.JWT_SECRET);
            res.status(200).send({ token });
        } catch (e) {
             next(e);
        }
    };
}

export default { signin };
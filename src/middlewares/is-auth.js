import 'dotenv/config';
import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error("User isn't authenticated.");
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.PRIVATE);
    } catch (err) {
        err.statusCode = 401;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error("User isn't authenticated.");
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};

export default isAuth;

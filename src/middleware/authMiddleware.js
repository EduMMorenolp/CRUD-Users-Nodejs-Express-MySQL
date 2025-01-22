// ./src/middleware/authMiddleware.js

import { verifyAuthToken } from '../utils/jwt.js';
import { CustomError } from '../utils/CustomError.js'; // Importa la clase de error personalizado

export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        throw new CustomError('Acceso denegado. No se proporcionó un token.', 401); // Mensaje en español
    }

    const decoded = verifyAuthToken(token);
    if (!decoded) {
        throw new CustomError('Token inválido', 400); // Mensaje en español
    }

    req.userId = decoded.userId;
    req.userRol = decoded.userRol;
    next();
};

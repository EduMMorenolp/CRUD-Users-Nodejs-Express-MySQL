import { checkUserActive } from '../models/MySQL/userModel.js'
import { CustomError } from '../utils/CustomError.js';

// Verificar si el usuario está activo
export const checkUserActiveMiddleware = async (req, res, next) => {
    const userId = req.userId;
    try {
        const isActive = await checkUserActive(userId);
        if (!isActive) {
            throw new CustomError('Usuario inactivo. Acceso denegado.', 403);
        }
        next();
    } catch (error) {
        console.error('Error al verificar el estado del usuario:', error);
        next(error)
    }
};

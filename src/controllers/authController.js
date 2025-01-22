import { createUserService, loginUserService, logoutUserService } from '../services/authService.js'

import { generateAuthToken } from '../utils/jwt.js';
import { CustomError } from '../utils/CustomError.js';

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const newUser = await createUserService(username,
            email, password);

        res.status(201).json({
            message: 'Usuario creado exitosamente', user: newUser
        });
    } catch (error) {
        next(error);
    }
};

export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Autenticación del usuario
        const user = await loginUserService(email, password);
        if (!user) {
            return res.status(401).json({
                message:
                    'Credenciales inválidas'
            });
        }
        // Generación del token JWT
        const token = await generateAuthToken(user.id,
            user.role);
        // Respuesta exitosa con token
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id, username: user.
                    username, email: user.email, rol: user.role,
                coins: user.coins
            }
        });
    } catch (error) {
        next(error);
    }
};

export const logoutUserController = async (req, res, next) => {
    try {
        const userId = req.userId;
        const success = await logoutUserService(userId);
        if (!success) {
            throw new CustomError('No se pudo cerrar sesión; el usuario no existe o ya estaba inactivo.', 404);
        }
        return res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
    } catch (error) {
        next(error);
    }
};
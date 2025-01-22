import { createUserModel, getUserByEmail, logoutUserModel } from '../models/MySQL/userModel.js'
import { comparePassword, hashPassword } from '../utils/bcrypt.js';
// Importa la clase de error personalizado
import { CustomError } from '../utils/CustomError.js';

// Crear un nuevo usuario
export const createUserService = async (username, email,
    password) => {
    try {
        if (!username || !email || !password) {
            throw new Error('All fields are required');
        }

        // Cifrar la contraseña
        const hashedPassword = await hashPassword(password);

        // Verificar el email
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            throw new CustomError('El correo electrónico ya está en uso', 409);
        }

        // Guardar el nuevo usuario en la base de datos
        return await createUserModel(username, email,
            hashedPassword);
    } catch (error) {
        throw error;
    }
};

// Iniciar sesión de un usuario
export const loginUserService = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user) {
        return null;
    }

    // Comparar la contraseña
    const isMatch = await comparePassword(password, user.
        password);
    if (isMatch) {
        const state = true;
        await logoutUserModel(user.id, state);
        return user;
    }

    return null;
};

export const logoutUserService = async (userId) => {
    try {
        const state = false;
        const success = await logoutUserModel(userId, state);
        if (!success) {
            throw new CustomError('No se pudo cerrar sesión; el usuario no existe o ya estaba inactivo.', 404);
        }
    } catch (error) {
        console.error('Error in logoutUserService');
        throw error;
    }
};
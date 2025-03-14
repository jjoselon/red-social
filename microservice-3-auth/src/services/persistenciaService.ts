import axios from 'axios';

const PERSISTENCIA_URL = process.env.PERSISTENCIA_URL || 'http://persistencia:3000';

export const verificarUsuario = async (correo: string) => {
    try {
        const response = await axios.get(`${PERSISTENCIA_URL}/api/usuarios/${correo}`);
        return response.data; // Retorna los datos del usuario si existe
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null; // Usuario no encontrado
        }
        throw new Error('Error al comunicarse con el servicio de persistencia');
    }
};

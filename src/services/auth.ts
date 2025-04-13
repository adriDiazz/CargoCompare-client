import { jwtDecode } from "jwt-decode";
import { LoginFormData } from "../pages/Login/LoginForm";
import { useUserStore } from "../common/stores/UserStore";
import { UserDTO } from "../common/interfaces/types";
import { Roles } from "../common/interfaces/roles";

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    mfa: boolean;
}

interface JWTClaims {
    email: string;
    sub: string;
    role: string[];
    company: string;
    user: UserDTO;
}

export const login = async ({ email, password }: LoginFormData): Promise<UserDTO | string> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Credenciales incorrectas");
      }
      throw new Error("Error en el servidor. Por favor, inténtalo más tarde.");
    }

    const data: LoginResponse = await response.json();


    // Validar que los tokens existen
    // if ((!data.accessToken || !data.refreshToken)) {
    //   throw new Error("Respuesta del servidor incompleta.");
    // }

    if(data.accessToken && data.refreshToken) {
    // Decodificar el JWT y validar los claims
        const claims: JWTClaims = jwtDecode<JWTClaims>(data.accessToken);


        if (!claims.user) {
          throw new Error("El token JWT no contiene los datos necesarios.");
        }

        // Guardar el usuario en el estado global
        const { setUser } = useUserStore.getState();

        setUser({
          user: claims.user
        });

        return claims.user;
    } else {
      return Roles.ADMIN;
    }

    

  } catch (error: any) {
    console.error("Error al iniciar sesión:", error.message);
    throw error; 
  }
};

export const me = async (): Promise<UserDTO> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include", // Enviar cookies junto con la solicitud
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos del usuario");
    }

    const data = await response.json() as UserDTO;

    return data;
  } catch (error: any) {
    console.error("Error al obtener los datos del usuario:", error.message);
    throw error; // Re-lanzar el error para que el componente lo maneje
  }
}

export const verifyAdminCode = async (verificationCode: string, email: string): Promise<UserDTO | undefined> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/verify-admin-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: verificationCode, email }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Código de verificación incorrecto");
    }

    const data: LoginResponse = await response.json();

    if(data.accessToken && data.refreshToken) {
    // Decodificar el JWT y validar los claims
        const claims: JWTClaims = jwtDecode<JWTClaims>(data.accessToken);

        if (!claims.user) {
          throw new Error("Error en la verificacion");
        }

        // Guardar el usuario en el estado global
        const { setUser } = useUserStore.getState();

        setUser({
          user: claims.user
        });

        return claims.user;
    }


  } catch (error: any) {
    console.error("Error al verificar el código de administrador:", error.message);
    throw error;
  }
};


export const validateSession = async (): Promise<void> => {
  const { setUser, clearUser } = useUserStore.getState();

  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include", 
    });

    if (response.ok) {
      const data = await response.json() as UserDTO;
      setUser({
        user: data,
      }); 
    } else if (response.status === 401) {
      console.error("Sesión no válida o expirada");
      clearUser(); // Limpiar el estado si el token es inválido
    } else {
      console.error("Error inesperado al validar la sesión:", response.statusText);
    }
  } catch (error) {
    console.error("Error inesperado al validar la sesión:", error);
  }
};

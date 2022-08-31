import { http } from "./Http"

export function loginConLaravel(datos) {
    return http().post("/v1/auth/login", datos);    
}

export const perfil = function () {
    return http().post("/v1/auth/perfil"); 
}

export const salir = () => {
    return http().post("/v1/auth/logout"); 
}


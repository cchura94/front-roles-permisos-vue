import { http } from "./Http"

export default {

    getRoles(){
        return http().get("/v1/role");
    },

    guardarRole(datos){
        return http().post("/v1/role", datos)
    },

    mostrarRole(id){
        return http().get("/v1/role/"+id)
    },

    asignarPermisos(permisos){
        return http().post("/v1/role/asignar-permiso", permisos)
    }

}

// getRoles
import { http } from "./Http"

export default {

    getPermisos(){
        return http().get("/v1/permiso");
    },

    guardarPermiso(datos){
        return http().post("/v1/permiso", datos)
    },

    mostrarPermiso(id){
        return http().get("/v1/permiso/"+id)
    }

}

// getRoles
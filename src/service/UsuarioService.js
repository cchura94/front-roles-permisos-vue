import { http } from "./Http"

export default {

    listaUsuarios(){
        return http().get("/v1/usuario");
    },

    guardarUsuario(datos){
        return http().post("/v1/usuario", datos);
    },

    mostrarUsuario(id){
        return http().get(`/v1/usuario/${id}`);
    },

    modificarUsuario(id, datos){
        return http().put(`/v1/usuario/${id}`, datos);
    },

    eliminarUsuario(id){
        return http().delete(`/v1/usuario/${id}`);
    },

    asignarRol(obj){
        return http().post(`/v1/usuario/asignar-rol`, obj);
    }
}
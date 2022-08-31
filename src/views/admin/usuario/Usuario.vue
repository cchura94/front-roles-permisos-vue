<template>

  <table border="1">
    <thead>
        <tr>
            <td>ID</td>
            <td>NOMBRE</td>
            <td>CORREO</td>
            <td>ROLES</td>
            <td>ACCION</td>
        </tr>
    </thead>
    <tbody>
        <tr v-for="user in usuarios" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
                <ul>
                    <li v-for="rol in user.roles" :key="rol.id">{{ rol.nombre }}</li>
                </ul>
            </td>
            <td>
                
            </td>
        </tr>
    </tbody>

  </table>
</template>

<script>
import UsuarioService from "@/service/UsuarioService"
import { ref, onMounted } from "vue"

export default {

    setup(){

        const usuarios = ref([])

        onMounted(async() => {
            const {data} = await UsuarioService.listaUsuarios();
            usuarios.value = data.data
        })
        


        return {
            usuarios
        }
    }

}
</script>

<style>

</style>
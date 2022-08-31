<template>
    <h1>Ingresar</h1>
    {{ usuario }}
    <hr>
    <label for="">Ingrese Correo:</label>
    <input type="email" v-model="usuario.email">
    <br>
    <label for="">Ingrese Conraseña:</label>
    <input type="password" v-model="usuario.password">
    <br>
    <button @click="ingresar()">INGRESAR</button>
    
</template>

<script>
import * as authService from "@/service/AuthService.js"
import {ref} from "vue"
import { useRouter } from 'vue-router'

export default {
    setup(){
        const router = useRouter()
        
        const usuario = ref({})

        const ingresar = async () => {
            try {
                const {data} = await authService.loginConLaravel(usuario.value)
                console.log(data);
                localStorage.setItem("token", data.accessToken);
                
                router.push({name: 'Perfil'})

                
            } catch (error) {
                console.log(error);              
            }
        }

        return {
            usuario,
            ingresar
        }
    }
}
</script>

<style>

</style>
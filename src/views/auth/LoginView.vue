<template>
    <h1>Ingresar</h1>
    {{ usuario }}
    <hr>
    <label for="">Ingrese Correo:</label>
    <input type="email" v-model="usuario.email">
    <span v-if="errores.email">{{ errores.email[0] }}</span>
    <br>
    <label for="">Ingrese Conraseña:</label>
    <input type="password" v-model="usuario.password">
    <span v-if="errores.password">{{ errores.password[0] }}</span>
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
        const errores = ref({})

        const ingresar = async () => {
            try {
                const {data} = await authService.loginConLaravel(usuario.value)
                console.log(data);
                localStorage.setItem("token", data.accessToken);
                
                router.push({name: 'Perfil'})

                
            } catch (error) {
                console.log("**********", error);
                if(error.response.status === 422) {
                    console.log(error.response.data.errors);
                    errores.value = error.response.data.errors
                }            
            }
        }

        return {
            usuario,
            ingresar,
            errores
        }
    }
}
</script>

<style>

</style>
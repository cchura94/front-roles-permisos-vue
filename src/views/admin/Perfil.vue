<template>
  <h1>PERFIL</h1>
  {{ perfil }}
</template>

<script>
import * as authService from "@/service/AuthService.js"
import {ref, onMounted } from "vue"

export default {

    setup(){

        const perfil = ref({});

        onMounted(async () => {
            const {data} = await authService.perfil();
            perfil.value = data
        })

        return {
            perfil
        }
    }

}
</script>

<style>

</style>
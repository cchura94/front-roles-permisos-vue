<template>
    <div class="card" v-if="ability.can('view', 'user')">
        <h1>PERFIL</h1>
        {{ perfil }}

    </div>
    <div class="card" v-else>
        <h1>No tiene permisos para ver</h1>
    </div>
</template>

<script>
import * as authService from "@/service/AuthService.js"
import {ref, onMounted } from "vue"
import ability from "@/acl/ability"

export default {

    setup(){

        const perfil = ref({});

        onMounted(async () => {
            const {data} = await authService.perfil();
            perfil.value = data

            console.log(ability.can('view', 'user'))
        })

        return {
            perfil,
            ability
        }
    }

}
</script>

<style>

</style>
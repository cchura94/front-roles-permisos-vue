<template>
    <div class="card" v-if="ability.can('viewAny', 'user')">
        <h1>PERFIL</h1>

         <Card style="width: 25em">
            <template #header>
                <img src="https://www.primefaces.org/wp-content/uploads/2020/02/primefacesorg-primevue-2020.png" style="height: 15rem" />
            </template>
            <template #title>
                {{ perfil.name }}
            </template>
            <template #subtitle>
                {{ perfil.created_at }}
            </template>
            <template #content>
                <p>{{ perfil.email }}</p>
            </template>
        </Card>


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
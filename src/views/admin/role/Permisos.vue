<template>
    <div class="card" v-if="role">
        <h1>Rol: {{ role.nombre }}</h1>

        <p>{{ permisos }}</p>

        <div class="field-checkbox" v-for="per in lista_permisos" :key="per.id">
            <Checkbox name="permiso" :value="per.id" v-model="permisos" />
            <label for="city1">{{per.detalle}}</label>
        </div>

        <button @click="actualizarPermisos()">Actualizar</button>

    </div>  
</template>

<script>
import RoleService from "@/service/RoleService"
import PermisoService from "@/service/PermisoService"
export default {
    data(){
        return {
            rol_id: null,
            role: null,
            permisos:[],
            lista_permisos: []
        }
    },
    async mounted(){
        this.rol_id = this.$route.params.id
        const {data} = await RoleService.mostrarRole(this.rol_id)
        this.role = data
        const per = await PermisoService.getPermisos()
        this.lista_permisos = per.data.data
    },
    methods: {
        async actualizarPermisos(){
            let datos = {
                role_id: this.rol_id,
                permisos: this.permisos
            }
            await RoleService.asignarPermisos(datos)
        }
    }

}
</script>

<style>

</style>
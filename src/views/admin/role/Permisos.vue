<template>
<Toast/>
    <div class="card" v-if="role">
        <h1>Rol: {{ role.nombre }}</h1>

        <Button label="Nuevo Permiso" icon="pi pi-external-link" @click="openModal" />
        <Dialog header="Nuevo Permiso" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true" class="p-fluid">
            
            <div class="field">
                <label for="action">Ingrese Acción</label>
                <InputText id="action" v-model.trim="permiso.action" autofocus />
            </div>
            <div class="field">
                <label for="subject">Ingrese Subject</label>
                <InputText id="subject" v-model.trim="permiso.subject" autofocus />
            </div>
            <div class="field">
                <label for="detalle">Ingrese Detalle</label>
                <InputText id="detalle" v-model.trim="permiso.detalle" autofocus />
            </div>
            
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                <Button label="Guardar Permiso" icon="pi pi-check" @click="guardarPermiso" autofocus />
            </template>
        </Dialog>

        <div class="field-checkbox" v-for="per in lista_permisos" :key="per.id">
            <Checkbox name="permiso" :value="per.id" v-model="permisos" />
            <label for="city1">{{per.detalle}}</label>
        </div>

        <Button label="Actualizar" @click="actualizarPermisos()" class="p-button-info" />

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
            lista_permisos: [],
            displayModal: false,
            permiso: {
                action: '',
                subject: '',
                detalle: ''
            }
        }
    },
    async mounted(){
        this.rol_id = this.$route.params.id
        const {data} = await RoleService.mostrarRole(this.rol_id)
        this.role = data
        const per = await PermisoService.getPermisos()
        this.lista_permisos = per.data.data

        for (let i = 0; i < this.lista_permisos.length; i++) {
            const perm = this.lista_permisos[i];
            if(this.verifica(perm)){
                this.permisos.push(perm.id)
            }
        }


    },
    methods: {
        async actualizarPermisos(){
            try{
                let datos = {
                    role_id: this.rol_id,
                    permisos: this.permisos
                }
                await RoleService.asignarPermisos(datos)
    
                this.$toast.add({severity:'success', summary: 'Permisos Actualizados', detail:'Los permisos están actualiados', life: 3000});

            }catch(error){
                this.$toast.add({severity:'error', summary: 'Error al actualizar', detail:'Ocurrió un error al actualiar los permisos', life: 3000});
            }
        },
        verifica(perm){
            let cont = 0;
            for (let j = 0; j < this.role.permisos.length; j++) {
                const p = this.role.permisos[j];
                if(p.action == perm.action && p.subject == perm.subject){
                    cont++;
                }                
            }
            if(cont>0){
                return true
            }
            return false
        },
        openModal() {
            this.displayModal = true;

        },
        closeModal() {
            this.displayModal = false;
        },
        async guardarPermiso(){
            const {data} = await PermisoService.guardarPermiso(this.permiso)
            const per = await PermisoService.getPermisos()
            this.lista_permisos = per.data.data

            this.closeModal()
        }
    }

}
</script>

<style>

</style>
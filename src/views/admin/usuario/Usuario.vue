<template>

<div class="card">

    <Button label="Nuevo Usuario" icon="pi pi-external-link" @click="openModal" v-if="can('update', 'user')" />
        <Dialog header="Header" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '40vw'}" :modal="true" class="p-fluid">
            
            <div class="field">
                <label for="name">Ingrese Nombre</label>
                <InputText id="name" v-model.trim="usuario.nombre" required="true" autofocus :class="{'p-invalid': submitted && !usuario.nombre}" />
                <small class="p-error" v-if="submitted && !usuario.nombre">El nombre es obligatorio.</small>
            </div>
            <div class="field">
                <label for="name">Ingrese Correo</label>
                <InputText id="name" v-model.trim="usuario.email" required="true" autofocus :class="{'p-invalid': submitted && !usuario.email}" />
                <small class="p-error" v-if="submitted && !usuario.email">El Correo es obligatorio.</small>
            </div>
            <div class="field">
                <label for="name">Ingrese Contraseña</label>
                <InputText type="password" id="name" v-model.trim="usuario.password" required="true" autofocus :class="{'p-invalid': submitted && !usuario.password}" />
                <small class="p-error" v-if="submitted && !usuario.password">La Conraseña es obligatorio.</small>
            </div>

            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                <Button label="Guardar" icon="pi pi-check" @click="closeModal" autofocus />
            </template>
        </Dialog>

    <DataTable :value="usuarios" responsiveLayout="scroll">
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Nombre"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="roles" header="Roles">
            <template #body="slotProps">
                <ul>
                    <li v-for="rol in slotProps.data.roles" :key="rol.id">
                        <span class="'product-badge status-success'">{{ rol.nombre }}</span>
                    </li>
                </ul>
            </template>
        </Column>
    </DataTable>

  <!--table border="1">
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

  </table-->

</div>
    
</template>

<script>
import UsuarioService from "@/service/UsuarioService"
import { ref, onMounted } from "vue"

import { useAbility } from "@casl/vue"

export default {

    setup(){
        
        const { can } = useAbility(); 

        const usuarios = ref([])
        const displayModal = ref(false);
        const usuario = ref({})
        const submitted = ref(false)

        onMounted(async() => {
            const {data} = await UsuarioService.listaUsuarios();
            usuarios.value = data.data
        })

        const openModal = () => {
            displayModal.value = true;
        };
        const closeModal = () => {
            displayModal.value = false;
        }
        


        return {
            usuarios,
            displayModal,
            openModal,
            closeModal,
            usuario,
            submitted,
            can
        }
    }

}
</script>

<style>

</style>
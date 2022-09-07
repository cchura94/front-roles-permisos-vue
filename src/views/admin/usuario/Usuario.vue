<template>
  <div class="card">
    <Button
      label="Nuevo Usuario"
      icon="pi pi-external-link"
      @click="openModal"
      v-if="can('create', 'user')"
    />
    <Dialog
      header="Nuevo Usuario"
      v-model:visible="displayModal"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '40vw' }"
      :modal="true"
      class="p-fluid"
    >
    {{ usuario }}
      <div class="field">
        <label for="name">Ingrese Nombre</label>
        <InputText
          id="name"
          v-model.trim="usuario.name"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !usuario.name }"
        />
        <small class="p-error" v-if="submitted && !usuario.name"
          >El nombre es obligatorio.</small
        >
      </div>
      <div class="field">
        <label for="email">Ingrese Correo</label>
        <InputText
          id="email"
          v-model.trim="usuario.email"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !usuario.email }"
        />
        <small class="p-error" v-if="submitted && !usuario.email"
          >El Correo es obligatorio.</small
        >
      </div>
      <div class="field">
        <label for="pass">Ingrese Contraseña</label>
        <InputText
          type="password"
          id="pass"
          v-model.trim="usuario.password"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !usuario.password }"
        />
        <small class="p-error" v-if="submitted && !usuario.password"
          >La Conraseña es obligatorio.</small
        >
      </div>

      <template #footer>
        <Button
          label="Cerrar"
          icon="pi pi-times"
          @click="closeModal"
          class="p-button-text"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          @click="guardarUsuario"
          autofocus
        />
      </template>
    </Dialog>

<Dialog
      header="Asignar Rol"
      v-model:visible="displayModalAddRol"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '40vw' }"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">USUARIO</label>
        <InputText
          id="name"
          v-model.trim="usuario.name"
          required="true"
          readonly
        />
      </div>
      <div class="field">
        <label for="email">Seleccionar Rol</label>
        <Dropdown v-model="usuario.role" :options="roles" optionLabel="nombre" optionValue="nombre" placeholder="Seleccionar rol" />

      </div>
      
      <template #footer>
        <Button
          label="Cerrar"
          icon="pi pi-times"
          @click="closeModalAddRol"
          class="p-button-text"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          @click="AsignarRol"
          autofocus
        />
      </template>
    </Dialog>


    <DataTable :value="usuarios" responsiveLayout="scroll">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Nombre"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="roles" header="Roles">
        <template #body="slotProps">
            <template v-for="rol in slotProps.data.roles" :key="rol.id">
                <Badge :value="rol.nombre" severity="success" class="mr-2"></Badge>
              
            </template>

          <Button icon="pi pi-add" class="p-button-rounded p-button-info p-button-sm" @click="openModalAddRol(slotProps.data)" />

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
import UsuarioService from "@/service/UsuarioService";
import { ref, onMounted } from "vue";

import { useAbility } from "@casl/vue";

export default {
  setup() {
    const { can } = useAbility();

    const usuarios = ref([]);
    const roles = ref([]);
    const displayModal = ref(false);
    const usuario = ref({});
    const submitted = ref(false);

    const displayModalAddRol = ref(false)


    onMounted(async () => {
      listarUsuario()
      roles.value = [{nombre: 'Admin'},{nombre: 'Gerente'},{nombre: 'anonimo'}]
    });

    const openModal = () => {
      displayModal.value = true;
    };
    const closeModal = () => {
      displayModal.value = false;
      usuario.value = {}
    };

    const openModalAddRol = (user) => {
        usuario.value = user
        displayModalAddRol.value = true;
    };

    const closeModalAddRol = () => {
      displayModalAddRol.value = false;
      usuario.value = {}
    };

    

    const AsignarRol = async () => {
        const {id, role} = usuario.value
        const obj = {
            user_id: id,
            role: role
        }
        
        const {data} = await UsuarioService.asignarRol(obj);
        console.log(data);
        closeModalAddRol()
        listarUsuario();

    }
    const listarUsuario = async () => {
        const { data } = await UsuarioService.listaUsuarios();
        usuarios.value = data.data;
    }

    const guardarUsuario = async () => {
        try{
            const {data} = await UsuarioService.guardarUsuario(usuario.value)
            listarUsuario()
            closeModal()
        }catch(error){
            console.log(error)
        }
    }

    return {
      usuarios,
      displayModal,
      openModal,
      closeModal,
      usuario,
      submitted,
      can,
      guardarUsuario,
      openModalAddRol,
    closeModalAddRol,
    AsignarRol,
    displayModalAddRol,
    roles
    };
  },
};
</script>

<style>
</style>
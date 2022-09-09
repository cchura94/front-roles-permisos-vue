<template>
  <div class="card">
    <h2>Lista de Roles</h2>

    <Button
      label="Nuevo Rol"
      icon="pi pi-external-link"
      @click="openModalNuevoRol"
    />
    <Dialog
      header="Nuevo Rol"
      v-model:visible="displayModalNuevoRol"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
      class="p-fluid"
    >
        {{ rol }}
      <div class="field">
        <label for="rol">Ingrese Nombre Rol</label>
        <InputText
          id="rol"
          v-model.trim="rol.nombre"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !rol.nombre }"
        />
        <small class="p-error" v-if="submitted && !rol.nombre"
          >El Nombre es obligatorio.</small
        >
      </div>
      <div class="field">
        <label for="detalle">Detalle Rol</label>
        <InputText id="detalle" v-model.trim="rol.detalle" autofocus />
      </div>
      <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          @click="closeModalRol"
          class="p-button-text"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          @click="guardarRol()"
          autofocus
        />
      </template>
    </Dialog>

    <DataTable :value="roles" responsiveLayout="scroll">
      <Column field="id" header="ID"></Column>
      <Column field="nombre" header="NOMBRE"></Column>
      <Column field="permisos" header="PERMISOS">
        <template #body="slotProps">
          <Badge
            v-for="per in slotProps.data.permisos"
            :value="per.detalle"
            class="mr-2"
            :key="per.id"
          ></Badge>
        </template>
      </Column>
      <!--Column field="quantity" header="Quantity"></Column-->
    </DataTable>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import RoleService from "@/service/RoleService";

export default {
  setup() {
    onMounted(async () => {
      listarRoles()
    });

    const roles = ref();
    const displayModalNuevoRol = ref(false);
    const rol = ref({});

    const openModalNuevoRol = () => {
      displayModalNuevoRol.value = true;
    };

    const closeModalRol = () => {
      displayModalNuevoRol.value = false;
    };

    const listarRoles = async() => {
        const { data } = await RoleService.getRoles();
        roles.value = data;
    }

    const guardarRol = async () => {
        const {data} = await RoleService.guardarRole(rol.value)
        console.log(data)
        listarRoles();
        closeModalRol();
    }

    return {
      roles,
      displayModalNuevoRol,
      openModalNuevoRol,
      closeModalRol,
      rol,
      guardarRol
    };
  },
};
</script>

<style>
</style>
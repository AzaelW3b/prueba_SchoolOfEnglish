<template>
    <div class="contenedor">
        <h5>Usuarios</h5>
        <q-btn
            label="Nuevo usuario"
            color="primary"
            class="q-my-md"
            icon="add"
            @click ="nuevoUsuario"
        />
        <div class="q-pa-md">
            <q-table
            title="Usuarios"
            :rows="usuarios"
            :columns="columns"
            row-key="name"
            >
            <template v-slot:body-cell-acciones ="props">
                <q-td>
                    <q-btn
                        flat
                        color="dark"
                        icon="edit"
                        @click="usuarioEditarId(props.row.id)"
                    >
                    <q-tooltip>{{ `Editar al usuario ${props.row.nombre}` }}</q-tooltip>
                    </q-btn>

                    <q-btn
                        flat
                        color="negative"
                        icon="delete"
                        @click="eliminarUsuarios(props.row.id)"
                    />
                </q-td>
            </template>
            </q-table>
        </div>
    </div>
    <ModalUsuarios ref="modalUsuarios"/>
</template>

<script setup>
import { ref } from 'vue'
import { useUsuarioStore } from 'src/stores/usuarios'
import { storeToRefs } from 'pinia'
import ModalUsuarios from 'src/components/usuarios/ModalUsuarios.vue'

const useUsuario = useUsuarioStore()
const { obtenerUsuarioId, eliminarUsuarios } = useUsuario
const { usuarios } = storeToRefs(useUsuario)

const modalUsuarios = ref(null)
const columns = [
  {
    name: 'nombre',
    label: 'Nombre',
    align: 'left',
    field: 'nombre',
    sortable: true
  },
  {
    name: 'apellidos',
    label: 'Apellidos',
    align: 'left',
    field: 'apellidos',
    sortable: true
  },
  {
    name: 'usuario',
    label: 'Usuario',
    align: 'left',
    field: 'usuario',
    sortable: true
  },
  {
    name: 'nivel',
    label: 'Nivel',
    align: 'left',
    field: 'nivel',
    sortable: true
  },
  {
    name: 'acciones',
    label: 'Acciones',
    align: 'left',
    field: 'acciones',
    sortable: true
  }

]
const nuevoUsuario = () => {
  modalUsuarios.value.abrir(true)
}
const usuarioEditarId = (id) => {
  console.log(id)
  obtenerUsuarioId(id)
  modalUsuarios.value.abrir(false)
}
</script>

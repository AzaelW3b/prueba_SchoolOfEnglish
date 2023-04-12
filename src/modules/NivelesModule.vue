<template>
  <div class="contenedor">
      <h5>Niveles</h5>
      <q-btn
          label="Nuevo nivel"
          color="primary"
          class="q-my-md"
          icon="add"
          @click ="nuevoNivel"
      />
      <div class="q-pa-md">
          <q-table
          title="Niveles"
          :rows="niveles"
          :columns="columns"
          row-key="name"
          >
          <template v-slot:body-cell-acciones ="props">
              <q-td>
                  <q-btn
                      flat
                      color="dark"
                      icon="edit"
                      @click="nivelEditarId(props.row.id)"
                  >
                  <q-tooltip>{{ `Editar el nivel ${props.row.nombre}` }}</q-tooltip>
                  </q-btn>

                  <q-btn
                      flat
                      color="negative"
                      icon="delete"
                      @click="eliminarNiveles(props.row.id)"
                  />
              </q-td>
          </template>
          </q-table>
      </div>
  </div>
  <ModalNiveles ref="modalNiveles"/>
</template>

<script setup>
import { ref } from 'vue'
import { useNivelesStore } from 'src/stores/niveles'
import { storeToRefs } from 'pinia'
import ModalNiveles from 'src/components/niveles/ModalNiveles.vue'

const useNivel = useNivelesStore()
const { obtenerNivelId, eliminarNiveles } = useNivel
const { niveles } = storeToRefs(useNivel)

const modalNiveles = ref(null)
const columns = [
  {
    name: 'nombre',
    label: 'Nombre',
    align: 'left',
    field: 'nombre',
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
const nuevoNivel = () => {
  modalNiveles.value.abrir(true)
}
const nivelEditarId = (id) => {
  console.log(id)
  obtenerNivelId(id)
  modalNiveles.value.abrir(false)
}
</script>

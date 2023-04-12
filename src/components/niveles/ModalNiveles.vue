<template>
    <div class="q-pa-md q-gutter-sm">

    <q-dialog v-model="modalNiveles">
      <q-card class="full-width">
        <q-card-section class="bg-primary text-white">
            <q-btn icon="close" flat round dense v-close-popup/>
          <div class="text-h4 text-center" v-if="nuevoRegistro">
            Nuevo Nivel
          </div>
          <div class="text-h4 text-center" v-else>
            Editar Nivel
          </div>
        </q-card-section>

        <div class="row q-my-sm">
            <q-card-section class="col-12 q-pt-none">
                <label>Nivel</label>
                <q-input
                    v-model="nivelObj.nombre"
                    label="Ingresa el nombre del nivel"
                    outlined
                />
            </q-card-section>
        </div>

        <q-card-actions align="right">
          <q-btn
            @click="guardarNivel"
            flat
            :label="nuevoRegistro ? 'GUARDAR NIVEL' : 'EDITAR NIVEL'"
            color="primary"
            v-close-popup
        />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useNivelesStore } from 'src/stores/niveles'
import { editarRegistros } from 'src/helpers/editarRegistros'
import { storeToRefs } from 'pinia'

export default {
  setup () {
    const useNivel = useNivelesStore()
    const { crearNiveles, editarNiveles } = useNivel
    const { nivel } = storeToRefs(useNivel)
    const modalNiveles = ref(false)

    const nivelObj = reactive({
      id: '',
      nombre: ''
    })
    const nuevoRegistro = ref(true)

    const abrir = (esNuevoRegistro) => {
      // cada que sea un nuevo registro, retorna un objeto vacio
      const nivelNuevo = {
        id: '',
        nombre: ''
      }
      Object.keys(nivel.value || nivelObj).forEach(key => {
        nivelObj[key] = editarRegistros(nivelNuevo, nivel.value, esNuevoRegistro)[key]
      })
      modalNiveles.value = true
      nuevoRegistro.value = esNuevoRegistro
    }

    const guardarNivel = () => {
      // validar si es nuevo registro
      if (nuevoRegistro.value) {
        nivelObj.id = uuidv4()
        const nivelNuevo = { ...nivelObj }
        crearNiveles(nivelNuevo)
      } else {
        // editando registro
        editarNiveles(nivelObj)
      }
      console.log(nivelObj)
    }
    return {
      // states
      modalNiveles,
      nivelObj,
      nuevoRegistro,
      // metodos
      abrir,
      guardarNivel
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
    <div class="q-pa-md q-gutter-sm">

    <q-dialog v-model="modalUsuarios">
      <q-card class="full-width">
        <q-card-section class="bg-primary text-white">
            <q-btn icon="close" flat round dense v-close-popup/>
          <div class="text-h4 text-center" v-if="nuevoRegistro">
            Nuevo Usuario
          </div>
          <div class="text-h4 text-center" v-else>
            Editar Usuario
          </div>
        </q-card-section>

        <div class="row q-my-sm">
            <q-card-section class="col-6 q-pt-none">
                <label>Nombre del usuario</label>
                <q-input
                    v-model="usuariosObj.nombre"
                    label="Ingresa el nombre del usuario"
                    outlined
                />
            </q-card-section>
            <q-card-section class="col-6 q-pt-none">
                <label>Apellidos del usuario</label>
                <q-input
                    v-model="usuariosObj.apellidos"
                    label="Ingresa los apellidos del usuario"
                    outlined
                />
            </q-card-section>
        </div>

        <div class="row q-my-sm">
            <q-card-section class="col-6 q-pt-none">
                <label>Usuario</label>
                <q-input
                    v-model="usuariosObj.usuario"
                    label="Ingresa el usuario"
                    outlined
                />
            </q-card-section>
            <q-card-section class="col-6 q-pt-none">
                <label>Nivel</label>
                <!-- TODO: ESTE SERA UN SELECT -->
                <q-input
                    v-model="usuariosObj.nivel"
                    label="Ingresa el nivel del usuario"
                    outlined
                />
            </q-card-section>
        </div>

        <q-card-actions align="right">
          <q-btn
            @click="guardarUsuario"
            flat
            :label="nuevoRegistro ? 'GUARDAR USUARIO' : 'EDITAR USUARIO'"
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
import { useUsuarioStore } from 'src/stores/usuarios'
import { editarRegistros } from 'src/helpers/editarRegistros'
import { storeToRefs } from 'pinia'

export default {
  setup () {
    const useUsuario = useUsuarioStore()
    const { crearUsuarios, editarUsuarios } = useUsuario
    const { usuario } = storeToRefs(useUsuario)
    const modalUsuarios = ref(false)

    const usuariosObj = reactive({
      id: '',
      nombre: '',
      apellidos: '',
      usuario: '',
      nivel: ''
    })
    const nuevoRegistro = ref(true)

    const abrir = (esNuevoRegistro) => {
      // cada que sea un nuevo registro, retorna un objeto vacio
      const usuarioNuevo = {
        id: '',
        nombre: '',
        apellidos: '',
        usuario: '',
        nivel: ''
      }
      Object.keys(usuario.value || usuariosObj).forEach(key => {
        usuariosObj[key] = editarRegistros(usuarioNuevo, usuario.value, esNuevoRegistro)[key]
      })
      modalUsuarios.value = true
      nuevoRegistro.value = esNuevoRegistro
    }

    const guardarUsuario = () => {
      // validar si es nuevo registro
      if (nuevoRegistro.value) {
        usuariosObj.id = uuidv4()
        const usuarioNuevo = { ...usuariosObj }
        crearUsuarios(usuarioNuevo)
      } else {
        // editando registro
        editarUsuarios(usuariosObj)
      }
      console.log(usuariosObj)
    }
    return {
      // states
      modalUsuarios,
      usuariosObj,
      nuevoRegistro,
      // metodos
      abrir,
      guardarUsuario
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

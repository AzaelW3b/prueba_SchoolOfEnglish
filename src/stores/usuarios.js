import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsuarioStore = defineStore('usuarios', () => {
  // state
  const usuarios = ref([])
  const usuario = ref(null)
  // alta de nuevo usuario
  const crearUsuarios = (usuario) => {
    usuarios.value = [...usuarios.value, usuario]
  }

  // obtener el id
  const obtenerUsuarioId = (id) => {
    usuario.value = usuarios.value.find(usuario => usuario.id === id)
  }

  // editar el usuario
  const editarUsuarios = (usuario) => {
    const usuarioOriginal = usuarios.value.find(usuarioIndex => usuarioIndex.id === usuario.id)
    Object.assign(usuarioOriginal, usuario)
  }
  // eliminar el usuario

  const eliminarUsuarios = (id) => {
    usuarios.value = usuarios.value.filter(usuario => usuario.id !== id)
  }

  return {
    // states
    usuarios,
    usuario,
    // metodos
    crearUsuarios,
    obtenerUsuarioId,
    editarUsuarios,
    eliminarUsuarios
  }
})

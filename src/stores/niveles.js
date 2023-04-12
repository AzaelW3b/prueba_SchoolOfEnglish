import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNivelesStore = defineStore('niveles', () => {
  // state
  const niveles = ref([])
  const nivel = ref(null)
  // alta de nuevo nivel
  const crearNiveles = (nivel) => {
    niveles.value = [...niveles.value, nivel]
  }

  // obtener el id
  const obtenerNivelId = (id) => {
    nivel.value = niveles.value.find(nivel => nivel.id === id)
  }

  // editar el nivel
  const editarNiveles = (nivel) => {
    const nivelOriginal = niveles.value.find(nivelIndex => nivelIndex.id === nivel.id)
    Object.assign(nivelOriginal, nivel)
  }
  // eliminar el nivel

  const eliminarNiveles = (id) => {
    niveles.value = niveles.value.filter(nivel => nivel.id !== id)
  }

  return {
    // states
    niveles,
    nivel,
    // metodos
    crearNiveles,
    obtenerNivelId,
    editarNiveles,
    eliminarNiveles
  }
})

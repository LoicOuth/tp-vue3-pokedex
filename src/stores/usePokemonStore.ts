import type { RequestState } from '@/models/http.model'
import type { Pokemon } from '@/models/pokemon.model'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons = ref<Pokemon[]>([])
  const pokemonsRequestState = ref<RequestState>('idle')
  const route = useRoute()

  const fetchPokemons = async () => {
    if (pokemonsRequestState.value === 'loading' || pokemonsRequestState.value === 'success') {
      return
    }

    pokemonsRequestState.value = 'loading'
    try {
      const response = await fetch('https://tyradex.app/api/v1/pokemon')
      const data = await response.json()
      pokemons.value = data
      pokemonsRequestState.value = 'success'
    } catch (error) {
      pokemonsRequestState.value = 'error'
      console.error('Failed to fetch pokemons:', error)
    }
  }

  const currentPokemmonDetail = computed(() => {
    return (
      route.params.id &&
      pokemons.value.find((pokemon) => pokemon.pokedex_id === Number(route.params.id))
    )
  })

  return { pokemons, pokemonsRequestState, fetchPokemons, currentPokemmonDetail }
})

<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue'
import SpinnerLoader from '@/components/SpinnerLoader.vue'
import type { Pokemon } from '@/models/pokemon.model'
import { onMounted, ref } from 'vue'

const pokemons = ref<Pokemon[]>([])
const isLoading = ref(false)

onMounted(() => {
  isLoading.value = true
  fetch('https://tyradex.vercel.app/api/v1/pokemon')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      pokemons.value = data
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error)
    })
    .finally(() => {
      isLoading.value = false
    })
})
</script>

<template>
  <div class="home">
    <h1>Pokédex</h1>
    <SpinnerLoader v-if="isLoading" />
    <div v-else class="pokemon-list">
      <PokemonCard v-for="pokemon in pokemons" :key="pokemon.pokedex_id" :pokemon="pokemon" />
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 20px;
}
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>

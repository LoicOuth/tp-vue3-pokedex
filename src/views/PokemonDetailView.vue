<script lang="ts" setup>
import PokemonTypesCard from '@/components/PokemonTypesCard.vue'
import SpinnerLoader from '@/components/SpinnerLoader.vue'
import type { Pokemon } from '@/models/pokemon.model'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isLoading = ref(false)
const pokemon = ref<Pokemon | null>(null)

onMounted(() => {
  isLoading.value = true
  const id = Number((route.params.id as string) || 0)
  fetch(`https://tyradex.vercel.app/api/v1/pokemon/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      pokemon.value = data
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
  <div class="pokemon-detail">
    <h1 v-if="pokemon">{{ pokemon.name.fr }}</h1>
    <SpinnerLoader v-if="isLoading" />
    <div v-else class="pokemon-info">
      <img :src="pokemon?.sprites.regular" :alt="pokemon?.name.fr" />
      <PokemonTypesCard :types="pokemon?.types || []" />
      <div class="pokemon-stats">
        <h2>Stats</h2>
        <ul>
          <li v-for="(value, key) in pokemon?.stats" :key="key">{{ key }}: {{ value }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pokemon-detail {
  padding: 20px;
  text-align: center;
}
.pokemon-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pokemon-info img {
  max-width: 200px;
  height: auto;
}
.pokemon-stats {
  margin-top: 20px;
}
.pokemon-stats ul {
  list-style: none;
  padding: 0;
}
.pokemon-stats li {
  margin: 5px 0;
}
.pokemon-stats h2 {
  margin-bottom: 10px;
}
</style>

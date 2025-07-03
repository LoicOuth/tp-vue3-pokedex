<script setup lang="ts">
import type { Pokemon } from '@/models/pokemon.model'
import PokemonTypesCard from './PokemonTypesCard.vue'

const props = defineProps<{
  pokemon: Pokemon
}>()
</script>

<template>
  <router-link :to="{ name: 'pokemon-detail', params: { id: props.pokemon.pokedex_id } }">
    <div class="pokemon-card">
      <h2>{{ props.pokemon.name.fr }}</h2>
      <img :src="props.pokemon.sprites.regular" :alt="props.pokemon.name.fr" />

      <PokemonTypesCard :types="props.pokemon.types" />
    </div>
  </router-link>
</template>

<style scoped>
.pokemon-card {
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  width: 150px;
  height: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pokemon-card h2 {
  font-size: 1.2em;
  margin: 0 0 10px;
  text-decoration: none;
}

.pokemon-card img {
  max-width: 100px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.pokemon-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  transition: transform 0.2s ease-in-out;
}
</style>

<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue'
import SpinnerLoader from '@/components/SpinnerLoader.vue'
import { onMounted } from 'vue'
import { usePokemonStore } from '@/stores/usePokemonStore'

const pokemonStore = usePokemonStore()

onMounted(async () => {
  await pokemonStore.fetchPokemons()
})
</script>

<template>
  <div class="home">
    <h1>Pokédex</h1>
    <SpinnerLoader v-if="pokemonStore.pokemonsRequestState === 'loading'" />
    <div v-else class="pokemon-list">
      <PokemonCard
        v-for="pokemon in pokemonStore.pokemons"
        :key="pokemon.pokedex_id"
        :pokemon="pokemon"
      />
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

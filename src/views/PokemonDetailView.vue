<script lang="ts" setup>
import PokemonTypesCard from '@/components/PokemonTypesCard.vue'
import SpinnerLoader from '@/components/SpinnerLoader.vue'
import { usePokemonStore } from '@/stores/usePokemonStore'
import { onMounted } from 'vue'

const pokemonStore = usePokemonStore()

onMounted(async () => {
  await pokemonStore.fetchPokemons()
})
</script>

<template>
  <div class="pokemon-detail">
    <h1 v-if="pokemonStore.currentPokemmonDetail">
      {{ pokemonStore.currentPokemmonDetail.name.fr }}
    </h1>
    <SpinnerLoader v-if="pokemonStore.pokemonsRequestState === 'loading'" />
    <div v-else-if="pokemonStore.currentPokemmonDetail" class="pokemon-info">
      <img
        :src="pokemonStore.currentPokemmonDetail.sprites.regular"
        :alt="pokemonStore.currentPokemmonDetail.name.fr"
      />
      <PokemonTypesCard :types="pokemonStore.currentPokemmonDetail.types || []" />
      <div class="pokemon-stats">
        <h2>Stats</h2>
        <ul>
          <li v-for="(value, key) in pokemonStore.currentPokemmonDetail.stats" :key="key">
            {{ key }}: {{ value }}
          </li>
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

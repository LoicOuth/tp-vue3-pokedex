<script lang="ts" setup>
import type { PokemonType } from '@/models/pokemon.model'

const props = defineProps<{
  types: PokemonType[]
}>()
</script>

<template>
  <div class="pokemon-types">
    <span v-for="(type, index) in props.types" :key="index" class="pokemon-type">
      <img :src="type.image" :alt="type.name" />
    </span>
  </div>
</template>

<style scoped>
.pokemon-types {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
}

.pokemon-type img {
  width: 50px;
  height: 50px;
}
</style>

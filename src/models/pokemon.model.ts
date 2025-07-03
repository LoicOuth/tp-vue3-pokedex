export interface Pokemon {
  pokedex_id: number
  name: {
    fr: string
  }
  sprites: {
    regular: string
  }
  types: PokemonType[]
  stats: {
    hp: number
    atk: number
    def: number
    spe_atk: number
    spe_def: number
    vit: number
  }
}

export interface PokemonType {
  name: string
  image: string
}

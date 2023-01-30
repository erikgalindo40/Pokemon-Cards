import PokemonCardTopHalf from "./PokemonCardTopHalf"
import PokemonCardBottomHalf from "./PokemonCardBottomHalf"

function PokemonCard() {
  return (
    <div className="pokemon-card">
      <PokemonCardTopHalf />
      <PokemonCardBottomHalf />
    </div>
  )
}

export default PokemonCard
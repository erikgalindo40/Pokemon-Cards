import React, { useContext, useEffect } from 'react'
import { PokemonContext } from '../App'

function PokemonCardBottomHalf() {
  const {pokemonGeneralData, pokemonTypeData} = useContext(PokemonContext)

  return (
    <div className="pokemon-card-bottom-half">
      <div className="pokemon-move-name">
        {pokemonGeneralData?.moves?.[0]?.move?.name}
      </div>
      <div className="pokemon-move-power">
        {pokemonGeneralData?.stats?.[1]?.base_stat}
      </div>
    </div>
  )
}

export default PokemonCardBottomHalf
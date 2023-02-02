import React, { useContext } from 'react'
import { PokemonContext } from '../App'

function PokemonCardTopHalf() {
  const {pokemonGeneralData, pokemonTypeData} = useContext(PokemonContext)

  return (
    <div className="pokemon-card-top-half">
      <div className='pokemon-name-and-health'>
        <div className="pokemon-name">
          {pokemonTypeData?.names?.[8]?.name}
        </div>
        <div className="pokemon-health">
          {pokemonGeneralData?.stats?.[0]?.base_stat} HP
        </div>
      </div>
      <div className="pokemon-image">
        <img src={pokemonGeneralData?.sprites?.front_default} alt="Pokemon Requested" />
      </div>
      <div className="pokemon-stats">
        {pokemonTypeData?.genera?.[7]?.genus}.<br/> Length: {pokemonGeneralData?.height/10}m , Weight: {pokemonGeneralData?.weight/10}kg.
      </div>
    </div>
  )
}

export default PokemonCardTopHalf
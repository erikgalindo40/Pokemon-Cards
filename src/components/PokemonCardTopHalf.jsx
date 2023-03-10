import React, { useContext } from 'react'
import { PokemonContext } from '../App'

function PokemonCardTopHalf() {
  const {pokemonGeneralData, pokemonTypeData} = useContext(PokemonContext)

  const altImageText = `${pokemonTypeData?.names?.[8]?.name} facing forward`
  let pokeImage = pokemonGeneralData?.sprites?.front_default
  let imageClasses = 'pokemon-image'
  
  if (pokeImage && pokeImage?.startsWith('https')) {
    //checks if image is a fetched image, NOT a stored image, to set correct classNames on image element
    imageClasses = 'pokemon-image pokemon-image-large'
  }

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
      <div className={imageClasses}>
        <img src={pokemonGeneralData?.sprites?.front_default} alt={altImageText} />
      </div>
      <div className="pokemon-stats">
        {pokemonTypeData?.genera?.[7]?.genus}.<br/> Length: {pokemonGeneralData?.height/10}m , Weight: {pokemonGeneralData?.weight/10}kg.
      </div>
    </div>
  )
}

export default PokemonCardTopHalf
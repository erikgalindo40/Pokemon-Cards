import PokemonCardTopHalf from "./PokemonCardTopHalf"
import PokemonCardBottomHalf from "./PokemonCardBottomHalf"
import { useContext, useState, useEffect } from "react"
import { PokemonContext } from "../App"

function PokemonCard() {
  const { pokemonTypeData } = useContext(PokemonContext)
  const [pokeStyle, setPokeStyle] = useState('pokemon-card pokemon-card-other')

  useEffect(() => {
    switch (pokemonTypeData?.color?.name) {
      case 'red':
        setPokeStyle('pokemon-card pokemon-card-red')
        break;
      case 'green':
        setPokeStyle('pokemon-card pokemon-card-green')
        break;
      case 'blue':
        setPokeStyle('pokemon-card pokemon-card-blue')
        break;
      case 'brown':
        setPokeStyle('pokemon-card pokemon-card-brown')
        break;
      case 'yellow':
        setPokeStyle('pokemon-card pokemon-card-yellow')
        break;
      default:
        break;
    }
  
    return 
  }, [pokemonTypeData])

  return (
    <div className={pokeStyle}>
      <PokemonCardTopHalf />
      <PokemonCardBottomHalf />
    </div>
  )
}

export default PokemonCard
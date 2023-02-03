
import './App.css';
import PokemonCard from './components/PokemonCard';
import ChangePokemonButtons from './components/ChangePokemonButtons';
import { useState, useEffect, createContext } from 'react';

export const PokemonContext = createContext()

function App() {
  const [pokemonGeneralData, setPokemonGeneralData] = useState({})
  const [pokemonTypeData, setPokemonTypeData] = useState({})
  const [pokeIndex, setPokeIndex] = useState(1)

  const fetchPokemonGeneralData = (index) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
    .then(res=>res.json())
    .then(data=>setPokemonGeneralData(data))
    .catch(err=>console.error(err))
    console.log('returned')
  }

  const fetchPokemonTypeData = (index) => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}`)
    .then(res=>res.json())
    .then(data=>setPokemonTypeData(data))
    .catch(err=>console.error(err))
  }

  const onClickPrevious = (index) => {
    if (index===1) {
      setPokeIndex(151)
    } else {
      setPokeIndex(parseInt(index-1))
    }
  }
  const onClickNext = (index) => {
    if (index===151) {
      setPokeIndex(1)
    } else {
      setPokeIndex(parseInt(index+1))
    }
  }

  useEffect(() => {
    fetchPokemonGeneralData(pokeIndex)
    fetchPokemonTypeData(pokeIndex)
  }, [pokeIndex])

  return (
    <div className="app">
      <ChangePokemonButtons index={pokeIndex} onNextPokemon={onClickNext} onPreviousPokemon={onClickPrevious} />
      <PokemonContext.Provider value={{pokemonGeneralData, pokemonTypeData}}>
        <PokemonCard />
      </PokemonContext.Provider>
    </div>
  );
}

export default App;

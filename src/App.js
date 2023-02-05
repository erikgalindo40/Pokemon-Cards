
import './App.css';
import PokemonCard from './components/PokemonCard';
import ChangePokemonButtons from './components/ChangePokemonButtons';
import { useState, useEffect, createContext } from 'react';

export const PokemonContext = createContext()

function App() {
  const [pokemonGeneralData, setPokemonGeneralData] = useState({})
  const [pokemonTypeData, setPokemonTypeData] = useState({})
  const [pokeIndex, setPokeIndex] = useState(1)

  const createGeneralDataLocalStorage = (fetchedData, index) => {
    // WHAT Creates Local Storage Object(named GeneralData${index}), from fetchedData, by storing only the required/used prop values with the Index passed in as the key
    // WHY PokeAPI's Fair Use Policy asks to locally store data to reduce the total amount of requests the API receives
    // WHERE This function gets called in fetchPokemonGeneralData

    /*
    pokemonGeneralData?.stats?.[0]?.base_stat
    pokemonGeneralData?.stats?.[1]?.base_stat
    pokemonGeneralData?.sprites?.front_default
    pokemonGeneralData?.height
    pokemonGeneralData?.weight
    pokemonGeneralData?.moves?.[0]?.move?.name
    */ 
    let pokeGeneralStorage = {
      stats: [{base_stat:fetchedData.stats[0].base_stat}, {base_stat:fetchedData.stats[1].base_stat}],
      sprites:{front_default:fetchedData.sprites.front_default},
      height:fetchedData.height,
      weight:fetchedData.weight,
      moves:[{move:{name:fetchedData.moves[0].move.name}}],
    }
    localStorage.setItem(`GeneralData${index}`, JSON.stringify(pokeGeneralStorage))
    return
  }

  const createTypeDataLocalStorage = (fetchedData, index) => {
    // WHAT Creates Local Storage Object(named TypeData${index}), from fetchedData, by storing only the required/used prop values with the Index passed in as the key
    // WHY PokeAPI's Fair Use Policy asks to locally store data to reduce the total amount of requests the API receives
    // WHERE This function gets called in fetchPokemonTypeData

    /*
    pokemonTypeData?.names?.[8]?.name
    pokemonTypeData?.genera?.[7]?.genus
    pokemonTypeData?.flavor_text_entries?.[0]?.flavor_text
    pokemonTypeData?.color?.name
    */
    let pokeTypeStorage = {
      names:Array(9),
      genera:Array(8),
      flavor_text_entries:[{flavor_text:fetchedData.flavor_text_entries[0].flavor_text}],
      color:{name:fetchedData.color.name},
    }
    pokeTypeStorage.names[8] = {name:fetchedData.names[8].name}
    pokeTypeStorage.genera[7] = {genus:fetchedData.genera[7].genus}

    localStorage.setItem(`TypeData${index}`, JSON.stringify(pokeTypeStorage))
    return
  }

  const fetchPokemonGeneralData = (index) => {
    // WHAT Fetches specific Pokemon's general data and stores that fetched data in the pokemonGeneralData state variable
    //      also calls createGeneralDataLocalStorage
    // WHY To show off cool pokemon info while reducing number of requests to the pokeAPI
    // WHERE Called within this component's useEffect snippet
    fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
    .then(res=>res.json())
    .then(data=>{
      setPokemonGeneralData(data)
      createGeneralDataLocalStorage(data, pokeIndex)
    })
    .catch(err=>console.error(err))
  }

  const fetchPokemonTypeData = (index) => {
    // WHAT Fetches specific Pokemon's type data and stores that fetched data in the pokemonTypeData state variable
    //      also calls createTypeDataLocalStorage
    // WHY To show off cool pokemon info while reducing number of requests to the pokeAPI
    // WHERE Called within this component's useEffect snippet
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}`)
    .then(res=>res.json())
    .then(data=>{
      setPokemonTypeData(data)
      createTypeDataLocalStorage(data, pokeIndex)
    })
    .catch(err=>console.error(err))
  }

  const onClickPrevious = (index) => {
    // WHAT Decrements state variable pokeIndex By 1
    //      unless called while pokeIndex value is 1, it resets pokeIndex to 151
    // WHY The pokeIndex variable is what's used to called a specific endpoint from the pokeAPI
    //     This function, along with onClickNext, keeps the pokeIndex variable between 1-151 to
    //     showcase the original 151 Pokemon
    // WHERE Passed into the ChangePokemonButtons Component as props
    if (index===1) {
      setPokeIndex(151)
    } else {
      setPokeIndex(parseInt(index-1))
    }
  }
  const onClickNext = (index) => {
    // WHAT Increments state variable pokeIndex By 1
    //      unless called while pokeIndex value is 151, it resets pokeIndex to 1
    // WHY The pokeIndex variable is what's used to called a specific endpoint from the pokeAPI
    //     This function, along with onClickPrevious, keeps the pokeIndex variable between 1-151 to
    //     showcase the original 151 Pokemon
    // WHERE Passed into the ChangePokemonButtons Component as props
    if (index===151) {
      setPokeIndex(1)
    } else {
      setPokeIndex(parseInt(index+1))
    }
  }

  useEffect(() => {
    // WHAT Checks if data requested is already stored in User's Local Storage
    //      If so, sets relevant state variables to equal Local Storage's objects
    //      If not, calls fetch functions to request data from PokeAPI
    if(localStorage.getItem(`GeneralData${pokeIndex}`)) {
      setPokemonGeneralData(JSON.parse(localStorage.getItem(`GeneralData${pokeIndex}`))) 
      setPokemonTypeData(JSON.parse(localStorage.getItem(`TypeData${pokeIndex}`))) 
    } else {
      fetchPokemonGeneralData(pokeIndex)
      fetchPokemonTypeData(pokeIndex)
    }
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

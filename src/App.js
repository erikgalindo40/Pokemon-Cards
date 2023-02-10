
import './App.css';
import PokemonCard from './components/PokemonCard';
import ChangePokemonButtons from './components/ChangePokemonButtons';
import { useState, useEffect, createContext } from 'react';
import missingNoError from './assets/missingNoError.JPEG'
import whosThatPokemon from './assets/whosThatPokemon.jpg'

export const PokemonContext = createContext()

function App() {
  const [pokemonGeneralData, setPokemonGeneralData] = useState({})
  const [pokemonTypeData, setPokemonTypeData] = useState({})
  const [pokeIndex, setPokeIndex] = useState(1)
  
  class GeneralDataObject {
    constructor() {
      this.stats = [{base_stat:''},{base_stat:''}]
      this.sprites = {front_default:''}
      this.height = 0
      this.weight = 0
      this.moves = [{move:{name:''}}]
    }
    addHealthStat(health) {
      this.stats[0].base_stat = health
    }
    addPowerStat(power) {
      this.stats[1].base_stat = power
    }
    addImage(sprite) {
      this.sprites.front_default = sprite
    }
    addHeight(height) {
      this.height = height
    }
    addWeight(weight) {
      this.weight = weight
    }
    addMove(move) {
      this.moves[0].move.name = move
    }
  }

  class TypeDataObject {
    constructor() {
      this.names = Array(9)
      this.genera = Array(8)
      this.flavor_text_entries = [{flavor_text:''}]
      this.color = {name:''}
    }
    addName(name) {
      this.names[8] = {name: name}
    }
    addGenus(genus) {
      this.genera[7] = {genus: genus}
    }
    addFlavorText(text) {
      this.flavor_text_entries[0].flavor_text = text
    }
    addColor(color) {
      this.color.name = color
    }
  }

  const createGeneralDataLocalStorage = (fetchedData, index) => {
    // WHAT Creates Local Storage Object(named GeneralData${index}), from fetchedData, by storing only the required/used prop values with the Index passed in as the key
    // WHY PokeAPI's Fair Use Policy asks to locally store data to reduce the total amount of requests the API receives
    // WHERE This function gets called in fetchPokemonGeneralData
    
    let newGeneralDataStorage = new GeneralDataObject()
    
    newGeneralDataStorage.addHealthStat(fetchedData.stats[0].base_stat)
    newGeneralDataStorage.addPowerStat(fetchedData.stats[1].base_stat)
    newGeneralDataStorage.addHeight(fetchedData.height)
    newGeneralDataStorage.addWeight(fetchedData.weight)
    newGeneralDataStorage.addMove(fetchedData.moves[0].move.name)
    newGeneralDataStorage.addImage(fetchedData.sprites.front_default)

    localStorage.setItem(`GeneralData${index}`, JSON.stringify(newGeneralDataStorage))
    return
  }

  const createTypeDataLocalStorage = (fetchedData, index) => {
    // WHAT Creates Local Storage Object(named TypeData${index}), from fetchedData, by storing only the required/used prop values with the Index passed in as the key
    // WHY PokeAPI's Fair Use Policy asks to locally store data to reduce the total amount of requests the API receives
    // WHERE This function gets called in fetchPokemonTypeData

    let newTypeDataStorage = new TypeDataObject()

    newTypeDataStorage.addName(fetchedData.names[8].name)
    newTypeDataStorage.addGenus(fetchedData.genera[7].genus)
    newTypeDataStorage.addFlavorText(fetchedData.flavor_text_entries[0].flavor_text)
    newTypeDataStorage.addColor(fetchedData.color.name)

    localStorage.setItem(`TypeData${index}`, JSON.stringify(newTypeDataStorage))
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
    .catch(err=>{
      setPokemonGeneralData({
        stats: [{base_stat:'??'}, {base_stat:'??'}],
        sprites:{front_default:missingNoError},
        height: 0,
        weight: 0,
        moves:[{move:{name:'error'}}],
      })
      console.error(err)
    })
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
    .catch(err=>{
      setPokemonTypeData({
        names:[0,1,2,3,4,5,6,7,{name:'MissingNo'}],
        genera:[0,1,2,3,4,5,6,{genus:'Unknown Anomaly'}],
        flavor_text_entries:[{flavor_text:'Retry Requesting Data Later'}],
        color:{name:'purple'},
      })
      console.error(err)
    })
  }

  const onClickPrevious = (index) => {
    // WHAT Decrements state variable pokeIndex By 1
    //      unless called while pokeIndex value is 1, it resets pokeIndex to 151
    // WHY The pokeIndex variable is what's used to called a specific endpoint from the pokeAPI
    //     This function, along with onClickNext, keeps the pokeIndex variable between 1-151 to
    //     showcase the original 151 Pokemon
    // WHERE Passed into the ChangePokemonButtons Component as props
    if (index<=1) {
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
    if (index>=151) {
      setPokeIndex(1)
    } else {
      setPokeIndex(parseInt(index+1))
    }
  }

  const showLoading = () => {
    // WHAT Shows page is loading to user
    setPokemonGeneralData({sprites:{front_default: whosThatPokemon}, moves:[{move:{name:'Loading'}}]})
    setPokemonTypeData({flavor_text_entries:[{flavor_text:'Please Wait'}]})
  }

  useEffect(() => {
    // WHAT Sets 'loading up' information then checks if data requested is already stored in User's Local Storage
    //      If so, sets relevant state variables to equal Local Storage's objects
    //      If not, calls fetch functions to request data from PokeAPI
    showLoading()
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

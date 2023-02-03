import React from 'react'

function ChangePokemonButtons({ index, onNextPokemon, onPreviousPokemon }) {
  return (
    <div className="buttons-container">
        <button className="change-index-button" onClick={()=>{onPreviousPokemon(index)}}>PREVIOUS</button>
        <button className="change-index-button" onClick={()=>{onNextPokemon(index)}}>NEXT</button>
      </div>
  )
}

export default ChangePokemonButtons
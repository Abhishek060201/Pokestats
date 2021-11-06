import React, { useEffect, useState } from 'react'

const PokemonCard = ({ pokemonName, pokemonType, pokemonImageUrl, pokemonHeight, pokemonWeight }) => {
  const [prevPokemonType, setPrevPokemonType] = useState('a')

  useEffect(() => {
    const theme = document.querySelector('.card')
    theme.classList.add(pokemonType)
    theme.classList.remove(prevPokemonType)
    setPrevPokemonType(pokemonType)
  }, [pokemonType])

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  return (
    <div className='card'>
      <div className='image-container'>
        <img alt='Image not available' src={pokemonImageUrl} height='200px' width='250' />
      </div>
      <div className='name' >{capitalize(pokemonName)}</div>
      <div className='type'>{capitalize(pokemonType)}<span> type</span></div>
      <div className='height'>{"Height: "}
        {(Math.round(pokemonHeight * 10) >= 100) ? Math.round(pokemonHeight * 0.1) + " m" : Math.round(pokemonHeight * 10) + " cm"}
      </div>
      <div className='height'>{"Weight: "}
        {((pokemonWeight / 10) < 1) ? Math.round(pokemonWeight * 100) + " gm" : Math.round(pokemonWeight / 10) + " kg"}
      </div>
    </div >
  )
}

export default PokemonCard

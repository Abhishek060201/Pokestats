import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";

import PokemonCard from "./Components/PokemonCard";

const App = () => {
  const [inputBoxValue, setInputBoxValue] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonType, setPokemonType] = useState("");
  const [pokemonImageUrl, setPokemonImageUrl] = useState("");
  const [pokemonHeight, setPokemonHeight] = useState();
  const [pokemonWeight, setPokemonWeight] = useState();
  const [showCard, setShowCard] = useState();
  const [pokemonNotFound, setPokemonNotFound] = useState(0);

  const setPokemonDetails = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${inputBoxValue}`;
      const res = await axios.get(url);
      const data = res.data;
      console.log(res);
      if (res.status === 404) {
        console.log("not-found");
      } else {
        setPokemonName(res.data.forms[0].name);
        setPokemonType(data.types[0].type.name);
        setPokemonImageUrl(data.sprites.other.dream_world.front_default);
        setPokemonHeight(data.height);
        setPokemonWeight(data.weight);
      }
      setPokemonNotFound(0);
    } catch (e) {
      if (e.response === undefined) {
        console.log("Check your connection");
      } else if (e.response.status === 404) {
        setPokemonNotFound(1);
      } else {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    setShowCard(1);
  }, [pokemonType]);

  const loadNext = () => {
    const topHalf = document.querySelector(".top-half");
    const circleLine = document.querySelector(".circle-line");
    const bottomHalf = document.querySelector(".bottom-half");
    const container = document.querySelector(".container");

    topHalf.classList.add("open");
    circleLine.classList.add("open");
    bottomHalf.classList.add("open");
    setTimeout(() => {
      container.classList.add("hide");
    }, 800);
  };

  const handleChange = (e) => {
    setInputBoxValue(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonDetails();
  };

  return (
    <div className="App">
      <div className="container">
        <div className="top-half">
          <div className="red"></div>
          <div className="circle-line">
            <div className="line"></div>
            <button className="start-button" onClick={loadNext}>
              START
            </button>
          </div>
        </div>
        <div className="bottom-half"></div>
      </div>
      <div className="main">
        <div className="bg-image"></div>
        <form className="input-form" onSubmit={handleSubmit}>
          <input
            className="input-pokemon"
            type="text"
            onChange={handleChange}
            placeholder="Enter Pokemon Name"
          />
        </form>
        {pokemonNotFound ? (
          <div className="not-found-message">
            Oops! We don't know such a Pokemon
          </div>
        ) : showCard && pokemonType.length ? (
          <PokemonCard
            pokemonName={pokemonName}
            pokemonType={pokemonType}
            pokemonImageUrl={pokemonImageUrl}
            pokemonHeight={pokemonHeight}
            pokemonWeight={pokemonWeight}
          />
        ) : null}
      </div>
    </div>
  );
};

export default App;

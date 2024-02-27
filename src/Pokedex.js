import React, { useState, useEffect } from "react";
import PokedexTable from "./PokedexTable";
import PokedexForm from "./PokedexForm";

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [confirmUpdate, setConfirmUpdate] = useState(false);

  useEffect(() => {
    const storedPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
    setPokemons(storedPokemons);
  }, []);

  const handleCreateSubmit = (formData) => {
    const updatedPokemons = [...pokemons, formData];
    localStorage.setItem("pokemons", JSON.stringify(updatedPokemons));
    setPokemons(updatedPokemons);
  };

  const handleUpdateSubmit = (formData) => {
    if (selectedPokemonIndex !== null) {
      if (confirmUpdate) {
        const updatedPokemons = [...pokemons];
        updatedPokemons[selectedPokemonIndex] = formData;
        localStorage.setItem("pokemons", JSON.stringify(updatedPokemons));
        setPokemons(updatedPokemons);
        setSelectedPokemonIndex(null);
      }
      setConfirmUpdate(!confirmUpdate);
    }
  };

  const handleUpdateClick = (index) => {
    setSelectedPokemonIndex(index);

    const selectedPokemon = pokemons[index];

    setFormValues(selectedPokemon);
  };

  const handleDeleteClick = (index) => {
    const updatedPokemons = [...pokemons];
    updatedPokemons.splice(index, 1);
    localStorage.setItem("pokemons", JSON.stringify(updatedPokemons));
    setPokemons(updatedPokemons);
  };

  return (
    <div className="main-body">
      <h1 className="main-title">Pokedex</h1>

      <PokedexTable
        pokemons={pokemons}
        onUpdateClick={handleUpdateClick}
        onDeleteClick={handleDeleteClick}
      />

      <h1 className="heading">Add a new pokemon</h1>
      <PokedexForm
        onSubmit={handleCreateSubmit}
        initialValues={{ name: "", type: "", secondType: "" }}
      />
      {confirmUpdate ? (
        <div>
          <h1>Confirm update</h1>
          <p>Are you sure you want to apply this update?</p>
          <button
            onClick={() => {
              setConfirmUpdate(true);
              setConfirmUpdate(!confirmUpdate);
            }}
          >
            Confirm
          </button>
          <button
            onClick={() => {
              setConfirmUpdate(!confirmUpdate);
            }}
          >
            Go back
          </button>
        </div>
      ) : (
        <div>
          <h1 className="heading">Update a pokemon</h1>
          <PokedexForm
            onSubmit={handleUpdateSubmit}
            initialValues={{ name: "", type: "", secondType: "" }}
            selectedPokemon={
              selectedPokemonIndex !== null
                ? pokemons[selectedPokemonIndex]
                : null
            }
          />
        </div>
      )}
    </div>
  );
}

export default Pokedex;

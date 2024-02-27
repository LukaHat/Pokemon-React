import React, { useState, useEffect } from "react";
import PokedexTable from "./PokedexTable";
import PokedexForm from "./PokedexForm";
import axios from "axios";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [dbTrainers, setDbTrainers] = useState([]);
  const [trainerId, setTrainerId] = useState(0);
  const [deleteFormValue, setDeleteFormValue] = useState({});

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
      const updatedPokemons = [...pokemons];
      updatedPokemons[selectedPokemonIndex] = formData;
      localStorage.setItem("pokemons", JSON.stringify(updatedPokemons));
      setPokemons(updatedPokemons);
      setSelectedPokemonIndex(null);
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

  const handleTrainersDatabase = () => {
    axios
      .get("https://localhost:44360/api/trainer/")
      .then((res) => {
        const data = res.data;
        console.log(res.data);
        const uniqueTrainers = data.filter(
          (trainer, index, arr) =>
            index === arr.findIndex((t) => t.id === trainer.id)
        );

        setDbTrainers(uniqueTrainers);
      })
      .catch((err) => console.log(err));
  };

  const handleTrainerDelete = (e) => {
    e.preventDefault();

    if (!deleteFormValue.id) {
      console.error("Please enter a valid trainer ID to delete.");
      return;
    }

    axios
      .delete(`https://localhost:44360/api/trainer/${deleteFormValue.id}`)
      .then((response) => {
        console.log(`Deleted trainer with ID ${deleteFormValue.id}`);
        console.log(response);
        handleTrainersDatabase();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="main-body">
      <h1 className="main-title">Pokedex</h1>
      <button onClick={handleTrainersDatabase}>
        Get Trainers from database
      </button>
      <ul>
        {dbTrainers.map((p) => (
          <li>{`ID: ${p.id}, Name: ${p.name}, Age: ${p.age}`}</li>
        ))}
      </ul>

      <form className="trainerDeleteForm" onSubmit={handleTrainerDelete}>
        <label htmlFor="deleteTrainer">Delete trainer:</label>
        <input
          type="number"
          placeholder="Enter trainer Id to delete"
          onInput={(e) => {
            setDeleteFormValue({ ...deleteFormValue, id: e.target.value });
            console.log(deleteFormValue.id);
          }}
        />
        <input type="submit" value="Delete" />
      </form>
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

      <h1 className="heading">Update a pokemon</h1>
      <PokedexForm
        onSubmit={handleUpdateSubmit}
        initialValues={{ name: "", type: "", secondType: "" }}
        selectedPokemon={
          selectedPokemonIndex !== null ? pokemons[selectedPokemonIndex] : null
        }
      />
    </div>
  );
};

export default Pokedex;

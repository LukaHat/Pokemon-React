import React, { useState, useEffect } from "react";
import PokedexTable from "../PokedexTable/PokedexTable";
import PokedexForm from "../PokedexForm/PokedexForm";
import API_Service from "../../services/API_Service";

import "./Pokedex.css";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [formValues, setFormValues] = useState({});
  const [dbPokemons, setDbPokemons] = useState([]);
  const [filters, setFilters] = useState({
    sortOrder: "ASC",
    sortBy: "Id",
    pageSize: 10,
    pageNum: 1,
  });

  const getPokemons = () => {
    API_Service.getPokemons(filters)
      .then((res) => {
        const data = res.data;
        console.log(res.data);
        const uniquePokemons = data.filter(
          (pokemon, index, arr) =>
            index === arr.findIndex((p) => p.pokemonId === pokemon.pokemonId)
        );
        setDbPokemons(uniquePokemons);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPokemons();
  }, [filters]);

  const handleCreateSubmit = (formData) => {
    API_Service.createPokemon(formData)
      .then((response) => {
        console.log(response.data);
        getPokemons();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateSubmit = (formData) => {
    if (selectedPokemon != {}) {
      API_Service.updatePokemon(selectedPokemon.pokemonId, formData)
        .then((response) => {
          console.log(response.data);
          getPokemons();
          setSelectedPokemon({});
          setFormValues({});
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleUpdateClick = (index) => {
    API_Service.getPokemonById(index)
      .then((res) => {
        const data = res.data;
        console.log(res.data);
        const selectedPokemon = res.data;
        setFormValues(selectedPokemon);
        setSelectedPokemon(selectedPokemon);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteClick = (index) => {
    API_Service.deletePokemon(index)
      .then((response) => {
        console.log(`Deleted pokemon with ID ${index}`);
        console.log(response);
        getPokemons();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleFilterChange = (e) => {
    console.log(filters);
    setFilters({ ...filters, [e.target.name]: e.target.value });
    console.log(filters);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    API_Service.getPokemons(filters)
      .then((res) => {
        const data = res.data;
        console.log(res.data);
        const uniquePokemons = data.filter(
          (pokemon, index, arr) =>
            index === arr.findIndex((p) => p.pokemonId === pokemon.pokemonId)
        );
        setDbPokemons(uniquePokemons);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-body">
      <h1 className="main-title">Pokedex Table</h1>

      <div className="filter-table">
        <form onSubmit={handleFilterSubmit} className="filter-form">
          <h2 className="filters-heading">Filters</h2>
          <label htmlFor="filters-type" className="filters-label">
            Enter type
          </label>
          <input
            type="text"
            id="filters-type"
            name="typeQuery"
            placeholder="For example: Grass"
            onChange={handleFilterChange}
            className="filters-input"
          />
          <label htmlFor="filters-name" className="filters-label">
            Enter pokemon name
          </label>
          <input
            type="text"
            id="filters-name"
            name="nameQuery"
            placeholder="For example: Charizard"
            onChange={handleFilterChange}
            className="filters-input"
          />
          <label htmlFor="filters-second-type" className="filters-label">
            Enter second type
          </label>
          <input
            type="text"
            id="filters-second-type"
            name="secondTypeQuery"
            placeholder="For example: Poison"
            onChange={handleFilterChange}
            className="filters-input"
          />
          <label htmlFor="filters-page-number" className="filters-label">
            Enter page number
          </label>
          <input
            type="number"
            id="filters-page-number"
            name="pageNum"
            placeholder="1"
            onChange={handleFilterChange}
            className="filters-input"
          />
          <label htmlFor="filters-page-size" className="filters-label">
            Enter page size
          </label>
          <input
            type="number"
            id="filters-page-size"
            name="pageSize"
            placeholder="10"
            onChange={handleFilterChange}
            className="filters-input"
          />
          <label htmlFor="filters-sort-order" className="filters-label">
            Sort order
          </label>
          <select
            name="sortOrder"
            id="filters-sort-order"
            onChange={handleFilterChange}
            className="filters-select"
          >
            <option value="ASC" selected className="filters-option">
              ASC
            </option>
            <option value="DESC" className="filters-option">
              DESC
            </option>
          </select>
          <label htmlFor="filters-sort-by" className="filters-label">
            Sort by
          </label>
          <select
            name="sortBy"
            id="filters-sort-by"
            onChange={handleFilterChange}
            className="filters-select"
          >
            <option value="PokemonId" selected className="filters-option">
              PokemonId
            </option>
            <option value="Name" className="filters-option">
              Name
            </option>
          </select>
          <input
            type="submit"
            value="Apply filters"
            className="filters-submit-button"
          />
        </form>
        <PokedexTable
          pokemons={dbPokemons}
          onUpdateClick={handleUpdateClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>

      <h1 className="heading">Add a new pokemon</h1>
      <PokedexForm
        onSubmit={handleCreateSubmit}
        initialValues={{ pokemonId: "", name: "", type: "", secondType: "" }}
      />

      <h1 className="heading">Update a pokemon</h1>
      <PokedexForm
        onSubmit={handleUpdateSubmit}
        initialValues={{
          pokemonId: "",
          name: "",
          type: "",
          secondType: "",
        }}
        selectedPokemon={selectedPokemon !== null ? selectedPokemon : null}
      />
    </div>
  );
};

export default Pokedex;

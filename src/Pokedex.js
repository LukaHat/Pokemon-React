import React, { useState, useEffect } from "react";
import PokedexTable from "./PokedexTable";
import PokedexForm from "./PokedexForm";
import axios from "axios";

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

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    if (filters == {}) {
      axios
        .get("https://localhost:44360/api/pokemon")
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
    } else {
      let queryString = "";

      for (const [key, value] of Object.entries(filters)) {
        queryString += `${key}=${value}&`;
      }

      queryString = queryString.slice(0, -1);

      console.log(queryString);
      axios
        .get(`https://localhost:44360/api/pokemon?${queryString}`)
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
    }
  };

  const handleCreateSubmit = (formData) => {
    console.log(formData);
    axios
      .post("https://localhost:44360/api/pokemon/", {
        pokemonId: formData.pokemonId,
        name: formData.name,
        type: formData.type,
        secondType: formData.secondType,
      })
      .then((response) => {
        console.log(response.data);
        const updatedPokemons = [...pokemons, response.data];
        localStorage.setItem("pokemons", JSON.stringify(updatedPokemons));
        setPokemons(updatedPokemons);
        getPokemons();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateSubmit = (formData) => {
    console.log(formData);
    console.log(selectedPokemon.pokemonId);
    if (selectedPokemon != {}) {
      axios
        .put(
          `https://localhost:44360/api/pokemon/${selectedPokemon.pokemonId}`,
          formData
        )
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
    console.log(index);
    axios
      .get(`https://localhost:44360/api/pokemon/${index}`)
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
    console.log(index);
    axios
      .delete(`https://localhost:44360/api/pokemon/${index}`)
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
    setFilters({});
    getPokemons();
  };

  return (
    <div className="main-body">
      <h1 className="main-title">Pokedex</h1>

      <form onSubmit={handleFilterSubmit}>
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
        />
        <label htmlFor="filters-sort-order" className="filters-label">
          Sort order
        </label>
        <select
          name="sortOrder"
          id="filters-sort-order"
          onChange={handleFilterChange}
        >
          <option value="ASC" selected>
            ASC
          </option>
          <option value="DESC">DESC</option>
        </select>
        <label htmlFor="filters-sort-by" className="filters-label">
          Sort by
        </label>
        <select
          name="sortBy"
          id="filters-sort-by"
          onChange={handleFilterChange}
        >
          <option value="PokemonId" selected>
            PokemonId
          </option>
          <option value="Name">Name</option>
        </select>
        <input type="submit" value="Apply filters" />
      </form>
      <PokedexTable
        pokemons={dbPokemons}
        onUpdateClick={handleUpdateClick}
        onDeleteClick={handleDeleteClick}
      />

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

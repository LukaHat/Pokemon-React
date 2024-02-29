// API_Service.js
import axios from "axios";

const baseURL = "https://localhost:44360/api/pokemon";

const API_Service = {
  getPokemons: (filters) => {
    let url = baseURL;

    if (filters && Object.keys(filters).length > 0) {
      let queryString = Object.entries(filters)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      url = `${baseURL}?${queryString}`;
    }

    return axios.get(url);
  },

  createPokemon: (formData) => {
    return axios.post(baseURL, formData);
  },

  updatePokemon: (pokemonId, formData) => {
    return axios.put(`${baseURL}/${pokemonId}`, formData);
  },

  getPokemonById: (pokemonId) => {
    return axios.get(`${baseURL}/${pokemonId}`);
  },

  deletePokemon: (pokemonId) => {
    return axios.delete(`${baseURL}/${pokemonId}`);
  },
};

export default API_Service;

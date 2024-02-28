import React from "react";

function PokedexTable({ pokemons, onUpdateClick, onDeleteClick }) {
  return (
    <table id="table">
      <thead>
        <tr>
          <th className="table-heading">Id</th>
          <th className="table-heading">Name</th>
          <th className="table-heading">Type</th>
          <th className="table-heading">Second Type</th>
          <th className="table-heading"></th>
        </tr>
      </thead>
      <tbody>
        {pokemons
          .filter((p) => p !== null)
          .map((pokemon, index) => (
            <tr key={index}>
              <td>{pokemon.pokemonId}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.type}</td>
              <td>{pokemon.secondType}</td>
              <td>
                <button onClick={() => onUpdateClick(pokemon.pokemonId)}>
                  Update
                </button>
                <button onClick={() => onDeleteClick(pokemon.pokemonId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default PokedexTable;

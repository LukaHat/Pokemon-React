import React from "react";

import "./PokedexTable.css";

function PokedexTable({ pokemons, onUpdateClick, onDeleteClick }) {
  return (
    <table id="table" className="table">
      <thead className="table-headings">
        <tr className="table-row-headings">
          <th className="table-heading">Id</th>
          <th className="table-heading">Name</th>
          <th className="table-heading">Type</th>
          <th className="table-heading">Second Type</th>
          <th className="table-heading"></th>
        </tr>
      </thead>
      <tbody className="table-body">
        {pokemons
          .filter((p) => p !== null)
          .map((pokemon, index) => (
            <tr key={index} className="table-row">
              <td className="table-data">{pokemon.pokemonId}</td>
              <td className="table-data">{pokemon.name}</td>
              <td className="table-data">{pokemon.type}</td>
              <td className="table-data">{pokemon.secondType}</td>
              <td className="table-data-buttons">
                <button
                  onClick={() => onUpdateClick(pokemon.pokemonId)}
                  className="table-button update-button"
                >
                  Update
                </button>
                <button
                  onClick={() => onDeleteClick(pokemon.pokemonId)}
                  className="table-button delete-button"
                >
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

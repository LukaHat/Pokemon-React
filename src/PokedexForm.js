import React, { useState, useEffect } from "react";

function PokedexForm({ onSubmit, initialValues, selectedPokemon }) {
  const [formValues, setFormValues] = useState(
    selectedPokemon || initialValues
  );

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setFormValues(selectedPokemon || initialValues);
  }, [selectedPokemon, initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues(initialValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="pokemonId">Enter pokemon Id</label>
      <input
        type="number"
        id="pokemonId"
        name="pokemonId"
        value={formValues.pokemonId}
        onChange={handleChange}
      />
      <label htmlFor="name">Enter pokemon name: </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formValues.name}
        onChange={handleChange}
      />
      <label htmlFor="type">Enter type: </label>
      <input
        type="text"
        id="type"
        name="type"
        value={formValues.type}
        onChange={handleChange}
      />
      <label htmlFor="secondType">Enter second type:</label>
      <input
        type="text"
        id="secondType"
        name="secondType"
        value={formValues.secondType}
        onChange={handleChange}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default PokedexForm;

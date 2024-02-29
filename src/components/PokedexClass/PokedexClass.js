import React from "react";
import PokedexTable from "../PokedexTable/PokedexTable";
import PokedexForm from "../PokedexForm/PokedexForm";

class PokedexClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      selectedPokemonIndex: null,
      formValues: {},
    };
  }

  componentDidMount() {
    const storedPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
    this.setState({ pokemons: storedPokemons });
  }

  handleCreateSubmit = (formData) => {
    const updatedPokemons = [...this.state.pokemons, formData];
    localStorage.setItem("pokemons", JSON.stringify(updatedPokemons));
    this.setState({ pokemons: updatedPokemons });
  };

  handleUpdateSubmit = (formData) => {
    if (this.state.selectedPokemonIndex !== null) {
      const updatedPokemons = [...this.state.pokemons];
      updatedPokemons[this.state.selectedPokemonIndex] = formData;
      localStorage.setItem("pokemons", JSON.stringify(updatedPokemons));
      this.setState({ pokemons: updatedPokemons, selectedPokemonIndex: null });
    }
  };
  handleUpdateClick = (index) => {
    this.setState({ selectedPokemonIndex: index });
    const selectedPokemon = this.state.pokemons[index];
    this.setState({ formValues: selectedPokemon });
  };

  handleDeleteClick = (index) => {
    const updatedPokemons = [...this.state.pokemons];
    updatedPokemons.splice(index, 1);
    localStorage.setItem("pokemons", JSON.stringify(updatedPokemons));
    this.setState({ pokemons: updatedPokemons });
  };

  render() {
    return (
      <div className="main-body">
        <h1 className="main-title">Pokedex</h1>

        <PokedexTable
          pokemons={this.state.pokemons}
          onUpdateClick={this.handleUpdateClick}
          onDeleteClick={this.handleDeleteClick}
        />

        <h1 className="heading">Add a new pokemon</h1>
        <PokedexForm
          onSubmit={this.handleCreateSubmit}
          initialValues={{ name: "", type: "", secondType: "" }}
        />

        <h1 className="heading">Update a pokemon</h1>
        <PokedexForm
          onSubmit={this.handleUpdateSubmit}
          initialValues={{ name: "", type: "", secondType: "" }}
          selectedPokemon={
            this.state.selectedPokemonIndex !== null
              ? this.state.pokemons[this.state.selectedPokemonIndex]
              : null
          }
        />
      </div>
    );
  }
}

export default PokedexClass;

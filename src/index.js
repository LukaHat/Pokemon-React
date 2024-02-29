import React from "react";
import ReactDOM from "react-dom/client";
import { Root } from "./pages/Root";
import { ErrorPage } from "./pages/Error";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Pokedex from "./components/Pokedex/Pokedex";
import { PokemonTablePage } from "./pages/PokemonTablePage";
import { PokemonCreatePage } from "./pages/PokemonCreatePage";
import { HomePage } from "./pages/HomePage/HomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="pokemon-table" element={<PokemonTablePage />}></Route>
        <Route path="pokemon-create" element={<PokemonCreatePage />}></Route>
      </Route>
      <Route path="error" element={<ErrorPage />}></Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

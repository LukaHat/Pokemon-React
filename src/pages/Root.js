import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";

export const Root = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

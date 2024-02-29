import React from "react";
import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <>
      <h1>Error occured!</h1>
      <p>{error.Message}</p>
    </>
  );
};

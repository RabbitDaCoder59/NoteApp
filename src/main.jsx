import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { LoadingProvider } from "./context/LoadingContext";
import { NotesProvider } from "./context/NotesContext";

ReactDOM.render(
  <LoadingProvider>
    <NotesProvider>
      <App />
    </NotesProvider>
  </LoadingProvider>,
  document.getElementById("root")
);

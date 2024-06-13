import React from "react";
import Container from "@mui/material/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";
import Content from "./Content";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Content />
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;

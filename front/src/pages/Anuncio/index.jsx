import Container from "../../components/Container";
// import styles from "./Anuncio.module.css";
import React, { useState } from "react";
import { buscarAnuncio } from "../../services/apiService";

const response = await buscarAnuncio();
const anuncios = await response.json();
const response1 = await buscarAnuncio();
const anuncios1 = await response1.json();

function Anuncio() {
  console.log("anuncios:", anuncios);

  return (
    <>
      <Container>
        <h1>HELLO WORLD</h1>
      </Container>
    </>
  );
}

export default Anuncio;

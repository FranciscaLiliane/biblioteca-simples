import React, { Component } from "react";
import api from "./api";
import search from "./icons/search.png";
import person from "./icons/person.png";
import link from "./icons/link.png";
import bookIcon from "./icons/book.png";
import "./App.scss";

const title = process.env.REACT_APP_TITLE;

class App extends Component {
  state = {
    books: [],
  };

  loadItens = async () => {
    const val = document.getElementById("txtSearch").value; //val é uma variavel que irá pegar o conteudo do input
    api
      .get(val)
      .then((response) => {
        this.setState({ books: response.data.hits });
      })
      .catch(() => {
        console.log("Erro ao recuperar os dados");
      });
  };
  render() {
    const { books } = this.state;
    return (
      <div id="divSearch">
        <div id="conteiner">
          <h1 className="biblioteca"> Biblioteca Simples </h1>
          <input
            type="text"
            id="txtSearch"
            className="search-box"
            placeholder="Buscar..."
          />
          <button id="btn">
            {<img src={search} id="btnSearch" onClick={this.loadItens} />}
          </button>
        </div>
        {console.log(typeof books)}
        {console.log(books)}
        <div id="results">
          {books.map((book) => (
            <article key={book.objectID} id="articleItens">
              <p id="author">
                <img src={person} id="iconPerson" /> Autor: {book.author}
              </p>

              <p id="title">
                {" "}
                <img src={bookIcon} id="iconBook" /> Titulo: {book.title}
              </p>

              <p id="url">
                {" "}
                <img src={link} id="iconLink" /> Url: {book.url}
              </p>
            </article>
          ))}
        </div>
      </div>
    );
  }
}
export default App;

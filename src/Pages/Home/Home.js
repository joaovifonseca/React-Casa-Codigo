import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Home.css';
import Tabela from '../../Components/Tabela/Tabela';
import Formulario from '../../Components/Formulario/Formulario';
import Header from '../../Components/Header/Header';
import PopUp from '../../Utils/PopUp';
import ApiService from '../../Utils/ApiService';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      autores: [],
    };
  }

  removeAutor = id => {

    const { autores } = this.state;

    const autoresAtualizados = autores.filter(autor => {
      return autor.id !== id;
    });
    ApiService.RemoveAutor(id)
        .then(res => {
          if(res.message === 'deleted') {
            this.setState({autores : [...autoresAtualizados]});
            PopUp.exibeMensagem('error', `Autor removido com sucesso`);
          }
        })
        .catch(err => PopUp.exibeMensagem('error', `Erro na comunicação com a api na deleção do autor`));
  }

  escutadorDeSubmit = autor => {
    ApiService.CriaAutor(JSON.stringify(autor))
      .then(res => {
        if(res.message === 'success') {
          this.setState({ autores: [...this.state.autores, res.data] });
          PopUp.exibeMensagem('sucess', "Autor adicionado com sucesso");
        }
      })
      .catch(err => PopUp.exibeMensagem('error', `Erro na comunicação com a api na inserção do autor`));
  }

  componentDidMount() {
    ApiService.ListaAutores()
    .then(res => {
      if(res.message === 'success') {
        this.setState({ autores: [...this.state.autores, ...res.data]})
      }
    })
    .catch(err => PopUp.exibeMensagem('error', `Erro na comunicação com a api ao listar do autor`));
  }

  render() {

    // ApiService.ListaAutores().then(res => console.log(res.data));
    // ApiService.ListaNomes().then(res => console.log(res.data));
    // ApiService.ListaLivros().then(res => console.log(res.data));

    return (
      <Fragment>
        <Header />
        <div className="container mb-10">
          <h1>Casa do código</h1>
          <Tabela autores={this.state.autores} removeAutor={this.removeAutor} />
          <Formulario escutadorDeSubmit={this.escutadorDeSubmit} />
        </div>
      </Fragment>
    );
  }
}

export default Home;

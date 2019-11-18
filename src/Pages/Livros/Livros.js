import React, { Component, Fragment } from 'react';
import Header from '../../Components/Header/Header';
import DataTable from '../../Components/DataTable/DataTable';
import ApiService from '../../Utils/ApiService';
import PopUp from '../../Utils/PopUp';

class Livros extends Component {
    constructor(props) {
        super(props);

        this.state = {
            livros: [],
            titulo: 'Livros'
        };
    }

    componentDidMount() {
      ApiService.ListaAutores()
      .then(res => {
          if(res.message === 'success') {
            PopUp.exibeMensagem('success', 'Sucesso ao listar os livros');

              this.setState({ livros: [...this.state.livros, ...res.data]})
          }
      })
    .catch(err => PopUp.exibeMensagem('error', 'Erro ao comunicação com a api ao listar os livros'))
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className='container'>
                    <h1>Página de Livros</h1>
                    <DataTable dados={this.state.livros} titulo={this.state.titulo} colunas={['livro']}/>
                </div>
            </Fragment>
        );
    }
}

export default Livros;
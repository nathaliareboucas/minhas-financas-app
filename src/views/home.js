import React from 'react'

import UsuarioService from '../services/usuario-service'

class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor() {
        super()
        this.usuarioService = new UsuarioService()
    }

    componentDidMount() {
        if (this.usuarioService.usuarioLogado()) {
            this.usuarioService.saldo(this.usuarioService.getUsuarioLogado().id)        
            .then(response => this.setState({saldo: response.data}))
            .catch(error => console.log(error.response))
        } else {
            this.props.history.push('/login')
        }        
    }

    render() {
        return (
            <div className="jumbotron" >
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>Essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg margin-right" href="#/cadastro-usuario" role="button"><i className="fa fa-users"></i>  Cadastrar Usuário</a>
                    <a className="btn btn-danger btn-lg" href="https://bootswatch.com/flatly/#" role="button"><i className="fa fa-users"></i>  Cadastrar Lançamento</a>
                </p>
            </div>
        )
    }

}

export default Home
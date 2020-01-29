import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import UsuarioService from '../services/usuario-service'
import { mensagemErro, mensagemSucesso, mensagemAlerta } from '../components/toast'

class CadastroUsuario extends React.Component {

	state = {
		nome: '',
		email: '',
		senha:'',
		senhaRepeticao: ''
	}

	constructor() {
		super()
		this.usuarioService = new UsuarioService()
	}

	validar() {
		const msgs = []

		if (!this.state.nome) msgs.push('O campo nome é obrigatório.')
		
		if (!this.state.email) {
			msgs.push('O campo email é obrigatório.')
		} else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
			msgs.push('Informe um email válido.')
		}

		if (!this.state.senha) msgs.push('O campo senha é obrigatório.')
		
		if (!this.state.senhaRepeticao) {
			msgs.push('O campo repita a senha é obrigatório.')
		} else if (this.state.senhaRepeticao !== this.state.senha) {
			msgs.push('As senhas devem ser iguais.')
		}

		return msgs
	}

	cadastrar = () => {
		const msgs = this.validar()

		if (msgs && msgs.length > 0) {
			msgs.forEach(msg => mensagemAlerta(msg))	
			return false
		}

		const usuario = {
			nome: this.state.nome,
			email: this.state.email,
			senha: this.state.senha
		}
		this.usuarioService.salvar(usuario)
			.then(response => {
				mensagemSucesso('Usuário salvo com sucesso, faça login para acessar o sistema.')
				this.props.history.push('/login')
			})
			.catch(error => mensagemErro(error.response.data.msg))
	}

	cancelar = () => {
		this.props.history.push('/login')
	}

	render() {
		return (
			<Card title="Cadastro de usuário">
				<div className="row">
					<div className="col-lg-12">
						<div className="bs-component">
							
							<FormGroup label="Nome  *" htmlFor="nome">
								<input id="nome" type="text" name="nome" placeholder="Nome" className="form-control"
								onChange={e => this.setState({nome: e.target.value})} />
							</FormGroup>

							<FormGroup label="Email  *" htmlFor="email">
								<input id="email" type="email" name="email" placeholder="Email" className="form-control"
								onChange={e => this.setState({email: e.target.value})}/>
							</FormGroup>

							<FormGroup label="Senha  *" htmlFor="senha">
								<input id="senha" type="password" name="senha" placeholder="Senha" className="form-control"
								onChange={e => this.setState({senha: e.target.value})}/>
							</FormGroup>

							<FormGroup label="Repita a senha  *" htmlFor="confirmacaoSenha">
								<input id="confirmacaoSenha" type="password" name="confirmacaoSenha" 
								placeholder="Repita a senha" className="form-control"
								onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
							</FormGroup>

							<button type="button" className="btn btn-primary margin-right"
							onClick={this.cadastrar}>Salvar</button>
							<button type="button" className="btn btn-secondary"
							onClick={this.cancelar}>Cancelar</button>

						</div>
					</div>
				</div>
			</Card>
		)
	}

}

export default withRouter(CadastroUsuario)
import React from 'react'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../services/usuario-service'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import LocalStorageService from '../services/localStorage-service'
import { mensagemErro } from '../components/toast'

class Login extends React.Component {

	state = {
		email: '',
		senha: ''
	}

	constructor() {
		super()
		this.usuarioService = new UsuarioService()
	}

	entrar = () => {
		this.usuarioService.autenticar({ email: this.state.email, senha: this.state.senha })
			.then(response => {
				LocalStorageService.adicionarItem('usuario-logado', response.data)
				this.props.history.push('/home')
			})
			.catch(error => mensagemErro(error.response.data.msg))
	}

	prepararCadastrar = () => {
		this.props.history.push('/cadastro-usuario')
	}

	render() {
		return (			
			<div className="row">
				<div className="col-md-6" style={ { position: 'relative', left: '300px'} }>
					<div className="bs-docs-section">

						<Card title="Login">							
							<div className="row">
								<div className="col-lg-12">
									<div className="bs-component">

										<fieldset>
											<FormGroup label="Email  *" htmlFor="email">
												<input id="email" type="email" className="form-control" 
												aria-describedby="emailHelp"
												placeholder="Digite seu e-mail" value={this.state.email}
												onChange={e => this.setState({email: e.target.value})}/>
											</FormGroup>

											<FormGroup label="Senha  *" htmlFor="senha">
												<input id="senha" type="password" className="form-control" aria-describedby="senhaHelp" 
												placeholder="Digite sua senha" value={this.state.senha} 
												onChange={e => this.setState({senha: e.target.value})}/>
											</FormGroup>
										</fieldset>

										<button onClick={this.entrar} className="btn btn-primary margin-right">Entrar</button>
										<button onClick={this.prepararCadastrar} className="btn btn-secondary">Cadastrar</button>

									</div>
								</div>
							</div>
						</Card>

					</div>
				</div>
			</div>
		)
	}

}

export default withRouter(Login)
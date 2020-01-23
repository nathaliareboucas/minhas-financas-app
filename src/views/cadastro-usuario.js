import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'

class CadastroUsuario extends React.Component {

	state = {
		nome: '',
		email: '',
		senha:'',
		senhaRepeticao: ''
	}

	cadastrar = () => {
		console.log(this.state)
	}

	render() {
		return (
			<div className="container">
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

								<button type="button" className="btn btn-success margin-right"
								onClick={this.cadastrar}>Salvar</button>
								<button type="button" className="btn btn-danger">Cancelar</button>

							</div>
						</div>
					</div>
				</Card>
			</div>
		)
	}

}

export default CadastroUsuario
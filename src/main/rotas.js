import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastro-usuario'

function Rotas() {
	return (
		<HashRouter>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/cadastro-usuario" component={CadastroUsuario} />
			</Switch>
		</HashRouter>
	)
}

export default Rotas
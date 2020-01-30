import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'

import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/cadastro-usuario'
import ConsultaLancamentos from '../views/consulta-lancamentos'

function Rotas() {
	return (
		<HashRouter>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/home" component={Home} />
				<Route path="/cadastro-usuario" component={CadastroUsuario} />
				<Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
			</Switch>
		</HashRouter>
	)
}

export default Rotas
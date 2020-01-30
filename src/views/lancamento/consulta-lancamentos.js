import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/SelectMenu'
import LancamentosTable from './LancamentosTable'
import LancamentoService from '../../services/lancamento-service'
import UsuarioService from '../../services/usuario-service'
import { mensagemErro } from '../../components/toast'

export class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        lancamentos: []
    }

    constructor() {
        super()
        this.lancamentoService = new LancamentoService()
        this.usuarioService = new UsuarioService()
    }

    componentDidMount() {
        if (!this.usuarioService.usuarioLogado()) {
            this.props.history.push('/login')
        }
    }
    consultar = () => {
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            usuario: this.usuarioService.getUsuarioLogado()
        }
        this.lancamentoService.lancamentosPorFiltro(lancamentoFiltro)
            .then(response => this.setState({lancamentos: response.data}))
            .catch(error => mensagemErro(error.response.data.msg))
    }

    render() {
        const meses = [ 
            {label: 'Selecione...', value: ''},
            {label: 'Janeiro', value: 1},
            {label: 'Fevereiro', value: 2},
            {label: 'Março', value: 3},
            {label: 'Abril', value: 4},
            {label: 'Maio', value: 5},
            {label: 'Junho', value: 5},
            {label: 'Julho', value: 7},
            {label: 'Agosto', value: 8},
            {label: 'Setembro', value: 9},
            {label: 'Outubro', value: 10},
            {label: 'Novembro', value: 11},
            {label: 'Dezembro', value: 12}
        ]

        const tipos = [
            {label: 'Selecione', value:''},
            {label: 'Receita', value:'RECEITA'},
            {label: 'Despesa', value: 'DESPESA'}
        ]

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup label="Ano  *" htmlFor="ano">
                                <input id="ano" type="text" className="form-control"
                                    value={this.state.ano}
                                    onChange={(e) => this.setState({ano: e.target.value})}
                                    placeholder="Digite o ano" />
                            </FormGroup>

                            <FormGroup label="Mês" htmlFor="mes">
                                <SelectMenu id="mes" lista={meses} className="form-control"
                                    value={this.state.mes}
                                    onChange={(e) => this.setState({mes: e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Tipo lançamento  *" htmlFor="tipoLancamento">
                                <SelectMenu id="tipoLancamento" lista={tipos} className="form-control"
                                    value={this.state.tipo}
                                    onChange={(e) => this.setState({tipo: e.target.value})}/>
                            </FormGroup>

                            <button type="button" className="btn btn-primary margin-right"
                                onClick={this.consultar}>Consultar</button>
                            <button type="button" className="btn btn-secondary">Cancelar</button>
                        </div>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}></LancamentosTable>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)
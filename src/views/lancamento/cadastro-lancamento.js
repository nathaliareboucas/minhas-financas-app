import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/SelectMenu'
import LancamentoService from '../../services/lancamento-service'

class CadastroLancamento extends React.Component {

    state = {
        id: null,
        descricao: '',
        mes: '',
        ano: '',
        valor: '',        
        tipo: '',
        status: ''
    }

    constructor() {
        super()
        this.lancamentoService = new LancamentoService()
    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        this.setState({ [name] : value })

    }

    salvar = () => {
        console.log('salvando', this.state)
    }

    cancelar = () => {
        console.log('cancelando')
    }

    render() {
        const tipos = this.lancamentoService.getTiposLancamento()
        const meses = this.lancamentoService.getMeses()

        return (
            <Card title="Cadastro de lançamento">
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup label="Descrição  *" htmlFor="descricao">
                            <input id="descricao" type="text" className="form-control"
                                name="descricao" placeholder="Descrição do lançamento"
                                value={this.state.descricao} onChange={this.handleChange}/>
                        </FormGroup>
                    </div>                
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup label="Ano  *" htmlFor="ano">
                            <input id="ano" type="text" className="form-control"
                                name="ano" placeholder="Ano do lançamento"
                                value={this.state.ano} onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup label="Mês  *" htmlFor="mes">
                            <SelectMenu id="mes" lista={meses} className="form-control"
                                name="mes" value={this.state.mes}
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup label="Valor  *" htmlFor="valor">
                            <input id="valor" type="text" className="form-control"
                                name="valor" placeholder="Valor do lançamento"
                                value={this.state.valor} onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <div className="col-md-3">
                        <FormGroup label="Tipo lançamento  *" htmlFor="tipoLancamento">
                            <SelectMenu id="tipoLancamento" lista={tipos} className="form-control"
                                name="tipo" value={this.state.tipo}
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <div className="col-md-3">
                        <FormGroup label="Status lançamento  *" htmlFor="status">
                            <input id="status" type="text" className="form-control" disabled 
                            name="status" value={this.state.status} />
                        </FormGroup>
                    </div>                    
                </div>

                <button type="button" className="btn btn-primary margin-right"
                    onClick={this.salvar}>Salvar</button>
                <button type="button" className="btn btn-secondary"
                    onClick={this.cancelar}>Cancelar</button>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamento)
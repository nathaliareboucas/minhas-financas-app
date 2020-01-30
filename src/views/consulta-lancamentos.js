import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import SelectMenu from '../components/SelectMenu'

export class ConsultaLancamentos extends React.Component {

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
                                <input id="ano" type="text" className="form-control" aria-describedby="ano"
                                    placeholder="Digite o ano" />
                            </FormGroup>

                            <FormGroup label="Mês" htmlFor="mes">
                                <SelectMenu id="mes" lista={meses} className="form-control"/>
                            </FormGroup>

                            <FormGroup label="Tipo lançamento  *" htmlFor="tipoLancamento">
                                <SelectMenu id="tipoLancamento" lista={tipos} className="form-control"/>
                            </FormGroup>

                            <button type="button" className="btn btn-primary margin-right">Consultar</button>
                            <button type="button" className="btn btn-secondary">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)
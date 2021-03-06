import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/SelectMenu'
import LancamentoService from '../../services/lancamento-service'
import usuarioService from '../../services/usuario-service'
import { mensagemSucesso, mensagemErro } from '../../components/toast'

class CadastroLancamento extends React.Component {

    state = {
        id: null,
        descricao: '',
        mes: '',
        ano: '',
        valor: '',        
        tipo: '',
        status: '',
        usuarioId: null,
        dataCadastro: null,
        atualizando: false
    }

    constructor() {
        super()
        this.lancamentoService = new LancamentoService()
        this.usuarioService = new usuarioService()
    }

    componentDidMount() {
        const params = this.props.match.params
        if (params.id) {
            this.lancamentoService.lancamentoPorId(params.id)
                .then(response => this.setState({...response.data, atualizando: true}))
                .catch(error => mensagemErro(error.response.data.msg))
        } 
    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        this.setState({ [name] : value })
    }

    limpaLancamento = () => {
        this.setState({
            id: null,
            descricao: '',
            mes: '',
            ano: '',
            valor: '',
            tipo: '',
            status: ''
        })
    }

    salvar = () => {
        if (this.usuarioService.usuarioLogado()) {                        
            const usuarioLogado = this.usuarioService.getUsuarioLogado()
            const { id, descricao, mes, ano, valor, tipo, status, dataCadastro } = this.state
            const lancamento = { id, descricao, mes, ano, valor, tipo, 
                status, usuarioId: usuarioLogado.id, dataCadastro }

            try {
                this.lancamentoService.validar(lancamento)
            } catch (erro) {
                erro.mensagens.forEach(msg => mensagemErro(msg))
                return false
            }
            
            this.state.atualizando ? this.atualizar(lancamento) : this.cadastrar(lancamento)  
        }           
    }

    cadastrar(lancamento) {
        this.lancamentoService.cadastrar(lancamento)
            .then(() => {
                this.limpaLancamento()
                mensagemSucesso('Lançamento salvo com sucesso.')
            })
            .catch(error => mensagemErro(error.response.data.msg))
    }

    atualizar(lancamento) {
        this.lancamentoService.atualizar(lancamento)
        .then(() => {
            mensagemSucesso('Lançamento salvo com sucesso.')
            this.props.history.push('/consulta-lancamentos')
        })
        .catch(error => mensagemErro(error.response.data.msg))
    }

    render() {
        const tipos = this.lancamentoService.getTiposLancamento()
        const meses = this.lancamentoService.getMeses()
        const status = this.lancamentoService.getStatusLancamento()

        return (
            <Card title={ this.state.atualizando ? 'Atualização de lançamento' : 'Cadastro de lançamento'}>
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
                        {this.state.atualizando && 
                            (<FormGroup label="Status lançamento " htmlFor="status">
                                <SelectMenu id="status" lista={status} className="form-control"
                                    name="status" value={this.state.status}                                
                                    onChange={this.handleChange}/>                           
                            </FormGroup>)
                        }
                    </div>                    
                </div>

                <button type="button" className="btn btn-primary margin-right"
                    onClick={this.salvar}>Salvar</button>
                <button type="button" className="btn btn-secondary"
                    onClick={e => this.props.history.push('/consulta-lancamentos')}>Cancelar</button>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamento)
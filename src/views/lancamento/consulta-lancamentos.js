import React from 'react'
import { withRouter } from 'react-router-dom'

import {Dialog} from 'primereact/dialog';

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/SelectMenu'
import LancamentosTable from './LancamentosTable'
import LancamentoService from '../../services/lancamento-service'
import UsuarioService from '../../services/usuario-service'
import { mensagemErro, mensagemSucesso, mensagemInfo } from '../../components/toast'

export class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: [],
        showConfirmDialog: false,
        lancamentoExcluidoId: {}
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

    valido() {
        if (!this.state.ano) {
            mensagemErro('O preenchimento do campo Ano é obrigatório')
            return false
        }
        return true
    }

    consultar = () => {
        if (this.valido()) {        
            const lancamentoFiltro = {
                ano: this.state.ano,
                mes: this.state.mes,
                tipo: this.state.tipo,
                descricao: this.state.descricao,
                usuario: this.usuarioService.getUsuarioLogado()
            }
            this.lancamentoService.lancamentosPorFiltro(lancamentoFiltro)
                .then(response => {
                    if (response.data.length < 1) {
                        mensagemInfo('Nenhum lançamento encontrado')
                    }
                    this.setState({lancamentos: response.data})
                })
                .catch(error => mensagemErro(error.response.data.msg))
        }
    }

    editar = (lancamentoId) => {
        this.props.history.push(`/cadastro-lancamento/${lancamentoId}`)
    }

    confirmarExclusao = (lancamentoId) => {
        this.setState({showConfirmDialog: true, lancamentoExcluidoId: lancamentoId})
    }

    limparExclusao = () => {
        this.setState({showConfirmDialog: false, lancamentoExcluidoId: {} })
    }

    deletar = () => {
        this.lancamentoService.delete(this.state.lancamentoExcluidoId)
            .then(() => {
                mensagemSucesso('Lançamento excluído com sucesso.')
                this.limparExclusao()
                this.consultar()
            })
            .catch(error => mensagemErro(error.response.data.msg))
    }   

    render() {
        const meses = this.lancamentoService.getMeses()
        const tipos = this.lancamentoService.getTiposLancamento()

        const btnsConfirmDialog = (
            <div>
                <button type="button" className="btn btn-primary margin-right"
                    onClick={this.deletar}>Sim</button>
                <button type="button" className="btn btn-secondary"
                    onClick={this.limparExclusao}>Não</button>
            </div>
        )

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

                            <FormGroup label="Descricao" htmlFor="descricao">
                                <input id="descricao" type="text" className="form-control"
                                    value={this.state.descricao}
                                    onChange={(e) => this.setState({descricao: e.target.value})}
                                    placeholder="Digite a descrição do lançamento" />
                            </FormGroup>

                            <FormGroup label="Tipo lançamento" htmlFor="tipoLancamento">
                                <SelectMenu id="tipoLancamento" lista={tipos} className="form-control"
                                    value={this.state.tipo}
                                    onChange={(e) => this.setState({tipo: e.target.value})}/>
                            </FormGroup>

                            <button type="button" className="btn btn-primary margin-right"
                                onClick={this.consultar}>Consultar</button>
                            <button type="button" className="btn btn-secondary"
                                onClick={e => this.props.history.push('/cadastro-lancamento')}>Cadastrar</button>
                        </div>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                editar={this.editar} deletar={this.confirmarExclusao}></LancamentosTable>
                        </div>
                    </div>
                </div>

                <div>
                    <Dialog header="Excluir lançamento" visible={this.state.showConfirmDialog} 
                        style={{width: '50vw'}} modal={true} footer={btnsConfirmDialog}
                        onHide={this.limparExclusao}>
                        Confirma a exclusão do lançamento?
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)
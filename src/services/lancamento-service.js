import ApiService from '../app/api-service';

import ErroValidacao from '../app/exception/ErroValidacao'

class LancamentoService extends ApiService {

    constructor() {
        super('/lancamentos')
    }

    getMeses() {
        return [ 
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
    }

    getTiposLancamento() {
        return [
            {label: 'Selecione', value:''},
            {label: 'Receita', value:'RECEITA'},
            {label: 'Despesa', value: 'DESPESA'}
        ]
    }

    validar(lancamento) {
        const erros = []

        if (!lancamento.descricao)
            erros.push('A descrição é obrigatória.')

        if (!lancamento.ano)
            erros.push('O ano é obrigatório.')

        if (!lancamento.mes)
            erros.push('O mês é obrigatório.')

        if (!lancamento.valor)
            erros.push('O valor é obrigatório.')

        if (!lancamento.tipo)
            erros.push('O tipo é obrigatório.')

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros)
        }
    }

    lancamentosPorFiltro(lancamentoFiltro) {        
        return this.getByFilter('', lancamentoFiltro)
    }

    lancamentoPorId(lancamentoId) {
        return this.getById('', lancamentoId)
    }

    cadastrar(lancamento) {
        return this.post('', lancamento)
    }

    atualizar(lancamento) {
        return this.put(`${lancamento.id}`, lancamento)
    }

}

export default LancamentoService
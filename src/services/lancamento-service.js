import ApiService from '../app/api-service';

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

    lancamentosPorFiltro(lancamentoFiltro) {        
        return this.getByFilter('', lancamentoFiltro)
    }

    salvar(lancamento) {
        return this.post('', lancamento)
    }

}

export default LancamentoService
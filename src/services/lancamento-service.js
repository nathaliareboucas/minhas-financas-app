import ApiService from '../app/api-service';

class LancamentoService extends ApiService {

    constructor() {
        super('/lancamentos')
    }

    lancamentosPorFiltro(lancamentoFiltro) {        
        return this.getByFilter('', lancamentoFiltro)
    }
    
}

export default LancamentoService
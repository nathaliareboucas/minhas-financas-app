import ApiService from '../app/api-service'
import LocalStorageService from './localStorage-service'

class UsuarioService extends ApiService {

    constructor() {
        super('/usuarios')
    }

    autenticar(credenciais) {
        return this.post('autenticar', credenciais)
    }

    saldo(idUsuarioLogado) {
        return this.getById('saldo', idUsuarioLogado)
    }

    getUsuarioLogado() {
        return LocalStorageService.obterItem('usuario-logado')
    }

    usuarioLogado() {        
        return this.getUsuarioLogado() !== null
    }
}

export default UsuarioService
import ApiService from '../app/api-service'

class UsuarioService extends ApiService {

    constructor() {
        super('/usuarios')
    }

    autenticar(credenciais) {
        return this.post('autenticar', credenciais)
    }
}

export default UsuarioService
import ApiService from '../app/api-service'
import LocalStorageService from './localStorage-service'

import ErroValidacao from '../app/exception/ErroValidacao'

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

    salvar(usuario) {
        return this.post('', usuario)
    }

    validar(usuario) {
        const erros = []

		if (!usuario.nome) erros.push('O campo nome é obrigatório.')
		
		if (!usuario.email) {
			erros.push('O campo email é obrigatório.')
		} else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
			erros.push('Informe um email válido.')
		}

		if (!usuario.senha) erros.push('O campo senha é obrigatório.')
		
		if (!usuario.senhaRepeticao) {
			erros.push('O campo repita a senha é obrigatório.')
		} else if (usuario.senhaRepeticao !== usuario.senha) {
			erros.push('As senhas devem ser iguais.')
		}

		if (erros && erros.length > 0) {
            throw new ErroValidacao(erros)
        }
    }
}

export default UsuarioService
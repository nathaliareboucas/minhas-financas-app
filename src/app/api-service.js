import axios from 'axios'

const httpCliente = axios.create({
    baseURL: 'http://localhost:8080'
})

class ApiService {

    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    post(url, objeto) {
        return httpCliente.post(`${this.apiUrl}/${url}`, objeto)
    }

    put(url, idObjeto, objeto) {
        return httpCliente.put(`${this.apiUrl}/${url}/${idObjeto}`, objeto)
    }

    delete(url) {
        return httpCliente.delete(`${this.apiUrl}/${url}`)
    }

    get(url) {
        return httpCliente.get(`${this.apiUrl}/${url}`)
    }

    getById(url, id) {
        return httpCliente.get(`${this.apiUrl}/${id}/${url}`)
    }
}

export default ApiService
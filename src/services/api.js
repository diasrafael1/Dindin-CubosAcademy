import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3344',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
})

export const login = async (body) => {
    let data = {}
    try {
        const response = await api.post('/login', body)
        data = {
            message: response.data,
            error: false
        }
    } catch (err) {
        data = {
            message: err.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const cadastro = async (body) => {
    let data = {}
    try {
        const response = await api.post('/usuario', body)
        data = {
            message: response.data,
            error: false
        }
    } catch (err) {
        data = {
            message: err.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const detalharUsuario = async (token) => {
    let data = {}
    try {
        const response = await api.get('/usuario', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        data = {
            message: response.data,
            error: false
        }
    } catch (err) {
        data = {
            message: err.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const atualizarUsuario = async (body,token) => {
    let data = {}
    try {
        const response = await api.put('/usuario', body, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        data = {
            message: response.data,
            error: false
        }
    } catch (err) {
        data = {
            message: err.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const listarCategorias = async (token) => {
    let data = {}
    try {
        const response = await api.get('/categoria', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        data = {
            message: response.data,
            error: false
        }
    } catch (err) {
        data = {
            message: err.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const adicionarRegistro = async (body ,token) => {
    let data = {}
    try {
        const response = await api.post('/transacao', body, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        data = {
            message: response.data,
            error: false
        }
    } catch (err) {
        data = {
            message: err.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const listarRegistros = async (token) => {
    let data = {}
    try {
        const response = await api.get('/transacao', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        data = {
            message: response.data,
            error: false
        }
    } catch (err) {
        data = {
            message: err.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const extratoRegistros = async (token) => {
    let data = {}
    try {
        const response = await api.get('/transacao/extrato', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        data = {
            message: response.data,
            error: false
        }
    } catch (err) {
        data = {
            message: err.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const deletarRegistro = async (id,token) => {
    let data = {}
    try {
        const response = await api.delete(`/transacao/${id}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        data = {
            message: response.data,
            error: false
        }
    } catch (err) {
        data = {
            message: err.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const atualizarRegistro = async (id,body,token) => {
    let data = {}
    try {
        const response = await api.put(`/transacao/${id}`,body, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        data = {
            message: response.data,
            error: false
        }
    } catch (err) {
        data = {
            message: err.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const aplicarFiltro = async (categorias,token) => {
    const formatacao = categorias.join("&filtro[]=")
    let data = {}
    try {
        const response = await api.get(`/transacao?filtro[]=${formatacao}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        data = {
            message: response.data,
            error: false
        }
    } catch (err) {
        data = {
            message: err.response,
            error: true
        }
    }
    return data
}
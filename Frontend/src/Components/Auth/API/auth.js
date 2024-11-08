import axios from '../../../libs/axios'

export const loginRequest = async (email, password) => {
    return axios.post('/login', {
        email,
        password
    })
}

export const adminRequest = async () => {
    return await axios.get('/admin')
}
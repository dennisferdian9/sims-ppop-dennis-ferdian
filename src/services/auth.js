import axios from "axios"

export const loginAPI = async (email='', password='') => {
    try {
        const endpoint = import.meta.env.VITE_API_ENDPOINT
        const response = await axios.post(endpoint + '/login', {
            email: email,
            password: password
        }).catch(err => {
            throw err?.response?.data ?? null
        })
        return {
            success: true,
            data :  response.data
        }
    } catch(e) {
        console.error(e) 
        return {
            success: false,
            data: e
        }
    }
    
}

export const registerAPI = async (email='', password='', firstName='', lastName='') => {
    try {
        const endpoint = import.meta.env.VITE_API_ENDPOINT
        const response =  await axios.post(endpoint + '/registration', {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
        }).catch(err => {
            console.error(err)
            throw err?.response?.data ?? null
        })
        return {
            success: true,
            data :  response
        }
    } catch(e) {
        console.error(e) 
        return {
            success: false,
            data: e
        }
    }
    
}
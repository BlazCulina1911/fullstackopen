import axios from "axios";

const url = '/api/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(url, newPerson)
    return request.then(response => response.data)
}

const update = (newPerson, id) => {
    const request = axios.put(`${url}/${id}`, newPerson)
    return request.then(response => response.data)
}

const remove = id => axios.delete(`${url}/${id}`)

export default {getAll, create, update, remove}
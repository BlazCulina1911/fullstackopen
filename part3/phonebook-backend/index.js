const PORT = 3001

const express = require('express')
const app = express()

let persons = [{
    "id": 1, "name": "Arto Hellas", "number": "040-123456"
}, {
    "id": 2, "name": "Ada Lovelace", "number": "39-44-5323523"
}, {
    "id": 3, "name": "Dan Abramov", "number": "12-43-234345"
}, {
    "id": 4, "name": "Mary Poppendieck", "number": "39-23-6423122"
}]

app.use(express.json())

const generateId = () => parseInt(Math.random() * 100000) //This bullshittery was required by the exercise.

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person === undefined) {
        response.status(404).end()
        return
    }
    response.json(person)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info of ${persons.length} persons!</p>
               <p>${new Date()}</p>`)
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (Object.keys(body).length === 0 || body === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'name already exists'
        })
    }


    const object = {id: generateId(), ...body}
    persons = persons.concat(object)
    response.send(object)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.send(204).end()
})

app.listen(PORT)
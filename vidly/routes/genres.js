const Joi = require('joi')
const express = require('express')
const routes = express.Router()

const genres = [
    {id: 1, name:"action"},
    {id: 2, name:"adventure"},
    {id: 3, name:"animation"},
    {id: 4, name:"horror"},
    {id: 5, name:"history"},
    {id: 6, name:"romantic"},
    {id: 7, name:"drama"},
]

// Get all
routes.get('/',(req, res)=>{
    res.send(genres)
})

// Get one
routes.get('/:id', (req, res)=>{
    const genre = findGenre(req.params.id)
    if(!genre) return res.status(404).send("The genre with the given id was not found!")
    res.send(genre)
})

// Post
routes.post('/', (req, res)=>{
    const {error, value} = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const genre={
        id: genres.length + 1,
        name: value.name
    }
    genres.push(genre)
    res.send(genre)
})

// Put
routes.put('/:id', (req,res)=>{
    const genre = findGenre(req.params.id)
    if(!genre) return res.status(404).send("The genre with the given id was not found!")

    const {error, value} = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    genre.name=value.name
    res.send(genre)
})

// Delete
routes.delete('/:id', (req, res)=>{
    const genre = findGenre(req.params.id)
    if(!genre) return res.status(404).send("The genre with the given id was not found!")
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genre)    
})

function validateGenre(genre){
    const schema= Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(genre)
}
function findGenre(id){

    return genres.find(g=>g.id===parseInt(id))
}

module.exports = routes
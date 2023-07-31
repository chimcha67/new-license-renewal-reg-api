const express = require('express')
const todoCntroller = require('../Controllers/todo-controller')
const { validateToken } = require('../Controllers/validateUserToken')
//const {validateToken} = require('../Controllers/validateUserToken')
const Router = express.Router()


Router.use(validateToken)


Router.get('/', todoCntroller.getAll)
Router.post('/create', todoCntroller.createTodo)
Router.get('/:id', todoCntroller.getSingleTodo)

Router.put('/:id', todoCntroller.updateTodoContent)
Router.delete('/:id', todoCntroller.deleteTodo)


module.exports = Router
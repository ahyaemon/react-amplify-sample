import React, {useState, useEffect, useContext} from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import {createTodo} from '../graphql/mutations'
import {listTodos} from '../graphql/queries'
import {AuthContext} from '../context/AuthProvider'

function Todos() {
    const authContext = useContext(AuthContext)
    const [newTodo, setNewTodo] = useState("do anything")
    const [todos, setTodos] = useState([])

    useEffect(() => {
        async function fetchTodos() {
            try {
                const todoData = await API.graphql(graphqlOperation(listTodos, { count: 20 }))
                console.log('fetch todos', todoData)
                const todos = todoData.data.listTodos.todos
                setTodos(todos)
            } catch (e) {
                console.log('error fetching todos', e)
            }
        }
        fetchTodos()
        // eslint-disable-next-line
    }, [])

    async function handleAddClick() {
        console.log(newTodo)
        await API.graphql(graphqlOperation(createTodo, { title: newTodo, owner: authContext.authState.cognitoUsername }))
    }

    return (
        <div>
            <h2>Todo list</h2>
            <div>
                <input type="text" value={newTodo} onChange={(e) => { setNewTodo(e.target.value)} }/>
                <button type="button" onClick={handleAddClick}>Add Todo</button>
            </div>
            <div>
                <table>
                    <thead><tr><th>id</th><th>title</th></tr></thead>
                    <tbody>
                    {
                        todos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.id}</td><td>{todo.title}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Todos;

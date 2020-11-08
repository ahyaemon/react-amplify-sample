import React, {useState, useEffect, useContext} from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import {createTodo, updateTodo} from '../graphql/mutations'
import {listTodos} from '../graphql/queries'
import {AuthContext} from '../context/AuthProvider'
import styles from './Todos.module.css'

function Todos() {
    const authContext = useContext(AuthContext)
    const [newTodo, setNewTodo] = useState("do anything")
    const [todos, setTodos] = useState([])
    const [editableTodo, setEditableTodo] = useState(null)

    useEffect(() => {
        async function fetchTodos() {
            try {
                const todoData = await API.graphql(graphqlOperation(listTodos, { count: 20 }))
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
        await API.graphql(graphqlOperation(createTodo, { title: newTodo, owner: authContext.authState.cognitoUsername }))
    }

    async function handleTodoClick(todo) {
        setEditableTodo(todo)
    }

    async function handleTodoChange(e, todo) {
        const fixed = { ...todo, title: e.target.value}
        setEditableTodo(fixed)
    }

    async function handleCancelClick() {
        setEditableTodo(null)
    }

    async function handleUpdateClick() {
        // todos 更新
        const newTodos = todos.map(todo => {
            if (todo.id === editableTodo.id) {
                todo.title = editableTodo.title
            }
            return todo
        })
        setTodos(newTodos)

        // dynamoDB 更新
        await API.graphql(graphqlOperation(updateTodo, {id: editableTodo.id, title: editableTodo.title}))

        setEditableTodo(null)
    }

    function isEditableTodo(id) {
        if (editableTodo === null) {
            return false
        }

        return editableTodo.id === id
    }

    return (
        <div>
            <h2>Todo list</h2>
            <div>
                <input type="text" value={newTodo} onChange={(e) => { setNewTodo(e.target.value)} }/>
                <button type="button" onClick={handleAddClick}>Add Todo</button>
            </div>
            <div>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>
                                    { isEditableTodo(todo.id) &&
                                    <>
                                        <input
                                            type="text"
                                            className={`todo-${todo.id}`}
                                            autoFocus={true}
                                            value={editableTodo.title}
                                            onChange={ (e) => { handleTodoChange(e, todo) } }
                                        />
                                        <button
                                            onClick={ handleUpdateClick }
                                        >更新</button>
                                        <button
                                            onClick={ handleCancelClick }
                                        >キャンセル</button>
                                    </>
                                    }
                                    { !isEditableTodo(todo.id) &&
                                    <div
                                        onClick={ () => { handleTodoClick(todo) } }
                                    >
                                        {todo.title}
                                    </div>
                                    }
                                </td>
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

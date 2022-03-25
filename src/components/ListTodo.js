import React, { useEffect, useState } from 'react'
import EditTodo from './EditTodo'

export default function ListTodo() {


    const [todos, setTodos] = useState([])

    const getTodos = async () => {
        const response = await fetch("http://localhost:5000/todos")
        const jsonData = await response.json()
        setTodos(jsonData)
    }

    const deleteTodo = async (id) => {

        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
        } catch (err) {
            console.error(err.message)
        }

    }


    useEffect(() => {
        getTodos()
    });

    return (
        <div>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                            <EditTodo todo={todo} />
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

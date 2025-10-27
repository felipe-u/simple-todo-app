import { useEffect, useState } from 'react'
import { getAllTodos } from '../services/todos'

export function useTodos() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    getAllTodos().then(setTodos)
  }, [])

  return { todos }
}

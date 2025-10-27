import { GET_ALL_TODOS } from '../constants/api'

export async function getAllTodos() {
  try {
    const res = await fetch(GET_ALL_TODOS)
    if (!res.ok) {
      throw new Error('No tasks found')
    }
    const data = await res.json()
    return data.todos
  } catch (error) {
    throw new Error(`Error fetching tasks: ${error.message}`)
  }
}

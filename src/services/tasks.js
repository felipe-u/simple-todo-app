import { GET_ALL_TASKS } from '../constants/api'

export async function getAllTasks() {
  try {
    const res = await fetch(`${GET_ALL_TASKS}?limit=0`)
    if (!res.ok) {
      throw new Error('No tasks found')
    }
    const data = await res.json()
    return data
  } catch (error) {
    throw new Error(`Error fetching tasks: ${error.message}`)
  }
}

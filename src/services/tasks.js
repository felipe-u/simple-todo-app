import { ENDPOINT_ADD_TASK, GET_ALL_TASKS } from '../constants/api'

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

export async function addNewTask(form) {
  try {
    const res = await fetch(ENDPOINT_ADD_TASK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: form.title,
        completed: form.status === 'completed' ? true : false,
        userId: 69,
      }),
    })
    if (!res.ok) {
      throw new Error('Error creating task')
    }
    const data = await res.json()
    return data
  } catch (error) {
    throw new Error(`Error creating task: ${error.message}`)
  }
}

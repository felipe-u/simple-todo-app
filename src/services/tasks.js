import { ENDPOINT_ADD_TASK, ENDPOINT_TASKS } from '../constants/api'

export async function getAllTasks() {
  try {
    const res = await fetch(`${ENDPOINT_TASKS}?limit=0`)
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
        userId: form.userId,
      }),
    })
    if (!res.ok) {
      throw new Error('Error creating task')
    }
    const data = await res.json()
    return data
  } catch (error) {
    throw new Error(`Error creating task: ${error?.message}`)
  }
}

export async function editTask(form) {
  try {
    const res = await fetch(`${ENDPOINT_TASKS}/${form.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: form.title,
        completed: form.status === 'completed' ? true : false,
        userId: form.userId,
      }),
    })
    if (!res.ok) {
      throw new Error('Error editing task')
    }
    const data = await res.json()
    return data
  } catch (error) {
    throw new Error(`Error editing task: ${error?.message}`)
  }
}

export async function deleteTask(taskId) {
  try {
    const res = await fetch(`${ENDPOINT_TASKS}/${taskId}`, {
      method: 'DELETE',
    })
    if (!res.ok) {
      throw new Error('Error deleting task')
    }
    const data = await res.json()
    return data
  } catch (error) {
    throw new Error(`Error deleting task: ${error?.message}`)
  }
}

import { useEffect, useState } from 'react'
import '../styles/TaskForm.css'

export function TaskForm({
  editMode,
  taskToEdit,
  onCreateNewTask,
  setShowTaskForm,
  onEditTask,
}) {
  const [form, setForm] = useState({
    id: '',
    title: '',
    status: 'pending',
    userId: '',
  })

  useEffect(() => {
    if (editMode) {
      const formattedStatus = taskToEdit.status ? 'completed' : 'pending'
      setForm({
        id: taskToEdit.id,
        title: taskToEdit.title,
        status: formattedStatus,
        userId: taskToEdit.userId,
      })
    }
  }, [editMode, taskToEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.title === '' || form.userId === '') return
    if (editMode) {
      await onEditTask(form)
    } else {
      await onCreateNewTask(form)
    }
    setForm({ id: '', title: '', status: 'pending', userId: '' })
    setShowTaskForm(false)
  }

  return (
    <div className='task-form-container' onClick={(e) => e.stopPropagation()}>
      <h2>{editMode ? 'Edit' : 'Add'} a task</h2>
      <form className='task-form' onSubmit={handleSubmit}>
        <div className='input-container'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            placeholder='Practice React, Watch new series...'
            required
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <div className='input-container'>
          <label htmlFor='status'>Status</label>
          <select
            name='status'
            id='status'
            value={form.status}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value='completed'>Completed</option>
            <option value='pending'>Pending</option>
          </select>
        </div>

        <hr />
        <div className='input-container'>
          <label htmlFor='userId'>User Id</label>
          <input
            type='number'
            name='userId'
            id='userId'
            min={0}
            max={3000}
            required
            value={form.userId}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, userId: e.target.value }))
            }
          />
        </div>

        <div className='btn-container'>
          <button>Submit</button>
          <button type='button' onClick={() => setShowTaskForm(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

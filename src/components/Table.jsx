import '../styles/Table.css'
import { Drop } from '../components/Drop'
import { TaskForm } from '../components/TaskForm.jsx'
import { useEffect, useRef, useState } from 'react'

export function Table({ tasks, onEditTask, onDeleteTask }) {
  const [dropMenu, setDropMenu] = useState({ show: false, taskId: '' })
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState({
    id: '',
    title: '',
    status: '',
    userId: '',
  })
  const dropRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        hideDropMenu()
      }
    }

    if (dropMenu.show) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropMenu.show])

  const showDropMenu = (taskId) => {
    setDropMenu({ show: true, taskId: taskId })
  }

  const hideDropMenu = () => {
    setDropMenu({ show: false, taskId: '' })
  }

  const openEditTaskForm = (id, title, status, userId) => {
    setTaskToEdit({ id, title, status, userId })
    setShowTaskForm(true)
    hideDropMenu()
  }

  const handleDeleteClick = (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(taskId)
      hideDropMenu()
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Status</th>
            <th>User</th>
            <th></th>
          </tr>
        </thead>

        {tasks.length > 0 ? (
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.todo}</td>
                <td>{task.completed ? 'Completed' : 'Pending'}</td>
                <td>{task.userId}</td>
                <td>
                  <div className='drop-menu-td'>
                    <button onClick={() => showDropMenu(task.id)}>...</button>
                    {dropMenu.show && dropMenu.taskId === task.id && (
                      <div ref={dropRef} className='drop-container'>
                        <Drop>
                          <p
                            onClick={() =>
                              openEditTaskForm(
                                task.id,
                                task.todo,
                                task.completed,
                                task.userId
                              )
                            }
                          >
                            Edit
                          </p>
                          <p onClick={() => handleDeleteClick(task.id)}>
                            Delete
                          </p>
                        </Drop>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody className='no-results'>
            <tr>
              <td>No results</td>
            </tr>
          </tbody>
        )}
      </table>

      {showTaskForm && (
        <div className='task-form-modal' onClick={() => setShowTaskForm(false)}>
          <TaskForm
            editMode={true}
            taskToEdit={taskToEdit}
            setShowTaskForm={setShowTaskForm}
            onEditTask={onEditTask}
          />
        </div>
      )}
    </>
  )
}

import '../styles/Table.css'
import { Drop } from '../components/Drop'
import { TaskForm } from '../components/TaskForm.jsx'
import { useEffect, useRef, useState } from 'react'
import { useTasks } from '../hooks/useTasks.js'
import { DotsIcon } from './Icons.jsx'
import { useTasksUI } from '../hooks/useTasksUI.js'
import { toast } from 'sonner'

export function Table() {
  const { paginatedTasks: tasks } = useTasks()
  const { safeDeleteTask } = useTasksUI()
  const [dropMenu, setDropMenu] = useState({
    show: false,
    taskId: '',
    position: 'bottom',
  })
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

  const showDropMenu = (taskId, btnEl) => {
    if (!btnEl) return

    const rect = btnEl.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const shouldOpenUp = spaceBelow < 120

    setDropMenu({
      show: true,
      taskId: taskId,
      position: shouldOpenUp ? 'top' : 'bottom',
    })
  }

  const hideDropMenu = () => {
    setDropMenu((prev) => ({ ...prev, show: false, taskId: '' }))
  }

  const openEditTaskForm = (id, title, status, userId) => {
    setTaskToEdit({ id, title, status, userId })
    setShowTaskForm(true)
    hideDropMenu()
  }

  const handleDeleteClick = (taskId) => {
    toast('Are you sure you want to delete this task?', {
      toasterId: 'confirm',
      duration: Infinity,
      action: {
        label: 'Confirm',
        onClick: () => {
          safeDeleteTask(taskId)
        },
      },
      cancel: {
        label: 'Cancel',
      },
    })
    hideDropMenu()
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
                <td>
                  {task.todo.length > 60
                    ? `${task.todo.slice(0, 60)}...`
                    : task.todo}
                </td>
                <td>{task.completed ? 'Completed' : 'Pending'}</td>
                <td>{task.userId}</td>
                <td>
                  <div className='drop-menu-td'>
                    <button
                      className='options-btn'
                      onClick={(e) => showDropMenu(task.id, e.currentTarget)}
                    >
                      <DotsIcon />
                    </button>
                    {dropMenu.show && dropMenu.taskId === task.id && (
                      <div
                        ref={dropRef}
                        className={`drop-menu-container ${
                          dropMenu.position === 'top'
                            ? 'drop-top'
                            : 'drop-bottom'
                        }`}
                      >
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
                          <hr />
                          <p
                            className='red-p'
                            onClick={() => handleDeleteClick(task.id)}
                          >
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
          />
        </div>
      )}
    </>
  )
}

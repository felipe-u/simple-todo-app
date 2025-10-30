import { createContext, useEffect, useState } from 'react'
import { useFilters } from '../hooks/useFilters'
import { usePagination } from '../hooks/usePagination'
import {
  addNewTask,
  deleteTask,
  editTask,
  getAllTasks,
} from '../services/tasks'

export const TasksContext = createContext()

export function TasksProvider({ children }) {
  const [allTasks, setAllTasks] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { filteredTasks, setSearchFilter, setStatusFilter, statusFilter } =
    useFilters(allTasks)

  const { limit, setLimit, numberOfPages, page, setPage, paginatedTasks } =
    usePagination(filteredTasks)

  useEffect(() => {
    const fetchAllTasks = async () => {
      setLoading(true)
      try {
        const { todos } = await getAllTasks()
        setAllTasks(todos)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAllTasks()
  }, [])

  useEffect(() => {
    setPage(1)
  }, [filteredTasks, setPage])

  const nextPage = () => {
    if (page < numberOfPages) {
      setPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  const onSearchTasks = (mode, query) => {
    setSearchFilter({ mode, query })
  }

  const onFilterTasksByStatus = (status) => {
    setStatusFilter(status)
  }

  const onCreateNewTask = async (form) => {
    setLoading(true)
    try {
      const tempId = Math.floor(Math.random() * (999 - 255 + 1)) + 255
      const newTask = {
        id: tempId,
        todo: form.title,
        completed: form.status === 'completed',
        userId: form.userId,
        _local: true,
      }
      // Only simulation (Fake API)
      await addNewTask(form)
      setAllTasks((prev) => [newTask, ...prev])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // is Local? -> client-side update
  // is not Local? -> server-side update
  const onEditTask = async (form) => {
    const isLocal = allTasks.find((task) => task.id === form.id)?._local

    if (isLocal) {
      setAllTasks((prev) =>
        prev.map((task) =>
          task.id === form.id
            ? {
                ...task,
                todo: form.title,
                completed: form.status === 'completed',
                userId: form.userId,
              }
            : task
        )
      )
      return
    }
    setLoading(true)
    try {
      const editedTask = await editTask(form)
      setAllTasks((prev) =>
        prev.map((task) => (task.id === form.id ? editedTask : task))
      )
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // is Local? -> client-side delete
  // is not Local? -> server-side delete
  const onDeleteTask = async (taskId) => {
    const isLocal = allTasks.find((task) => task.id === taskId)?._local

    if (isLocal) {
      setAllTasks((prev) => prev.filter((task) => task.id !== taskId))
      return
    }

    setLoading(true)
    try {
      const deletedTask = await deleteTask(taskId)
      const { id } = deletedTask
      setAllTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <TasksContext.Provider
      value={{
        paginatedTasks,
        limit,
        setLimit,
        page,
        nextPage,
        prevPage,
        numberOfPages,
        onSearchTasks,
        onFilterTasksByStatus,
        statusFilter,
        onCreateNewTask,
        onEditTask,
        onDeleteTask,
        loading,
        error,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

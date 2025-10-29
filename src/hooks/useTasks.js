import { useEffect, useRef, useState } from 'react'
import { addNewTask, getAllTasks } from '../services/tasks'

export function useTasks() {
  const [allTasks, setAllTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [tasksToShow, setTasksToShow] = useState([])

  const [limit, setLimit] = useState(25)
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [page, setPage] = useState(1)

  const [searchFilter, setSearchFilter] = useState({ mode: '', query: '' })
  const [statusFilter, setStatusFilter] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const prevLimit = useRef(limit)

  useEffect(() => {
    const fetchAllTasks = async () => {
      setLoading(true)
      try {
        const { todos } = await getAllTasks()
        setAllTasks(todos)
        setFilteredTasks(todos)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAllTasks()
  }, [])

  useEffect(() => {
    let results = [...allTasks]

    if (searchFilter.mode === 'title' && searchFilter.query) {
      results = results.filter((task) =>
        task.todo.toLowerCase().includes(searchFilter.query.toLowerCase())
      )
    }

    if (searchFilter.mode === 'user' && searchFilter.query) {
      results = results.filter(
        (task) => task.userId === Number(searchFilter.query)
      )
    }

    if (statusFilter === 'completed') {
      results = results.filter((task) => task.completed)
    }

    if (statusFilter === 'pending') {
      results = results.filter((task) => !task.completed)
    }

    setFilteredTasks(results)
    setPage(1)
  }, [allTasks, searchFilter, statusFilter])

  useEffect(() => {
    setNumberOfPages(Math.ceil(filteredTasks.length / limit))
    const start = limit * (page - 1)
    const end = limit * page
    setTasksToShow(filteredTasks.slice(start, end))
  }, [filteredTasks, limit, page])

  useEffect(() => {
    if (prevLimit.current !== limit) {
      const oldLimit = prevLimit.current
      const oldPage = page
      const newPage = Math.ceil(((oldPage - 1) * oldLimit + 1) / limit)
      setPage(Math.min(Math.max(newPage, 1), numberOfPages || 1))
      prevLimit.current = limit
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit])

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
      const newTask = await addNewTask(form)
      setAllTasks((prev) => [newTask, ...prev])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    tasksToShow,
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
    loading,
    error,
  }
}

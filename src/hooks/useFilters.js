import { useEffect, useState } from 'react'

export function useFilters(allTasks) {
  const [filteredTasks, setFilteredTasks] = useState([])
  const [searchFilter, setSearchFilter] = useState({ mode: '', query: '' })
  const [statusFilter, setStatusFilter] = useState('')

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
  }, [allTasks, searchFilter, statusFilter])

  return {
    filteredTasks,
    setSearchFilter,
    setStatusFilter,
    statusFilter,
  }
}

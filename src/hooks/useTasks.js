import { useEffect, useRef, useState } from 'react'
import { getAllTasks } from '../services/tasks'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [limit, setLimit] = useState(25)
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [page, setPage] = useState(1)

  const prevLimit = useRef(limit)

  useEffect(() => {
    if (prevLimit.current !== limit) {
      const oldLimit = prevLimit.current
      const oldPage = page
      const newPage = Math.ceil(((oldPage - 1) * oldLimit + 1) / limit)
      setPage(newPage)
      prevLimit.current = limit
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit])

  useEffect(() => {
    getAllTasks(limit, page).then(({ todos, total }) => {
      setTasks(todos)
      setNumberOfPages(Math.ceil(total / Number(limit)))
    })
  }, [limit, page])

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

  return { tasks, limit, setLimit, page, nextPage, prevPage, numberOfPages }
}

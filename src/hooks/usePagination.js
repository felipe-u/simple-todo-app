import { useEffect, useRef, useState } from 'react'

export function usePagination(filteredTasks) {
  const [limit, setLimit] = useState(25)
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [page, setPage] = useState(1)
  const [paginatedTasks, setPaginatedTasks] = useState([])

  const prevLimit = useRef(limit)

  useEffect(() => {
    setNumberOfPages(Math.ceil(filteredTasks.length / limit))
    const start = limit * (page - 1)
    const end = limit * page
    setPaginatedTasks(filteredTasks.slice(start, end))
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

  return { limit, setLimit, numberOfPages, page, setPage, paginatedTasks }
}

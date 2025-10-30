import '../styles/Pagination.css'
import { useTasks } from '../hooks/useTasks'
import { NextPageIcon, PrevPageIcon } from './Icons'

export function Pagination() {
  const { limit, setLimit, numberOfPages, page, nextPage, prevPage } =
    useTasks()
  return (
    <div className='pagination-container'>
      <div className='rows-per-page'>
        <p>Rows per page</p>
        <select
          name='rows'
          id='rows'
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        >
          <option value='10'>10</option>
          <option value='25'>25</option>
          <option value='50'>50</option>
        </select>
      </div>
      <div className='pages'>
        <p>
          Pages {page} of {numberOfPages}
        </p>
        <div className='pages-btn-container'>
          <button className='page-btn' onClick={prevPage}>
            <PrevPageIcon />
          </button>
          <button className='page-btn' onClick={nextPage}>
            <NextPageIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

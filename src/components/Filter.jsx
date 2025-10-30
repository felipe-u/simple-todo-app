import { useRef, useState } from 'react'
import '../styles/Filter.css'
import { Drop } from './Drop'
import { useTasks } from '../hooks/useTasks'

export function Filter() {
  const { onSearchTasks, onFilterTasksByStatus, statusFilter } = useTasks()
  const [searchBar, setSearchBar] = useState({ show: false, mode: 'title' })
  const [showDrop, setShowDrop] = useState(false)
  const queryRef = useRef('')

  const showSearchBar = (mode) => {
    setSearchBar({ show: true, mode: mode })
  }

  const hideSearchBar = () => {
    setSearchBar((prev) => ({ ...prev, show: false }))
    onSearchTasks(null, '')
  }

  const toggleDrop = () => {
    setShowDrop(!showDrop)
  }

  const onFilterByStatus = (filter) => {
    onFilterTasksByStatus(filter)
    toggleDrop()
  }

  return (
    <div className='filter-container'>
      {searchBar.show ? (
        <div className='search-bar-container'>
          <button onClick={hideSearchBar}>X</button>
          <input
            type='text'
            placeholder={
              searchBar.mode === 'title' ? 'Search Task' : '123, 456...'
            }
            ref={queryRef}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              onSearchTasks(searchBar.mode, queryRef.current.value)
            }
          />
        </div>
      ) : (
        <div className='filter-btn-container'>
          <button
            className='secondary-btn'
            onClick={() => showSearchBar('title')}
          >
            Filter By Title
          </button>
          <button
            className='secondary-btn'
            onClick={() => showSearchBar('user')}
          >
            Filter By User
          </button>
        </div>
      )}

      <div className='status-btn-container'>
        <button onClick={toggleDrop}>Status</button>
        {statusFilter && <p>{statusFilter}</p>}
        {showDrop && (
          <div className='status-drop-container'>
            <Drop>
              <p onClick={() => onFilterByStatus('completed')}>Completed</p>
              <p onClick={() => onFilterByStatus('pending')}>Pending</p>
              {statusFilter && (
                <p onClick={() => onFilterByStatus('')}>Clear Filter</p>
              )}
            </Drop>
          </div>
        )}
      </div>
    </div>
  )
}

import { useRef, useState } from 'react'
import '../styles/Filter.css'
import { Drop } from './Drop'

export function Filter({ onFilterTasks }) {
  const [searchBar, setSearchBar] = useState({ show: false, mode: 'title' })
  const [showDrop, setShowDrop] = useState(false)
  const queryRef = useRef('')

  const showSearchBar = (mode) => {
    setSearchBar({ show: true, mode: mode })
  }

  const hideSearchBar = () => {
    setSearchBar((prev) => ({ ...prev, show: false }))
    onFilterTasks('', null)
  }

  const toggleDrop = () => {
    setShowDrop(!showDrop)
  }

  const onFilterByStatus = (filter) => {
    onFilterTasks('', filter)
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
              onFilterTasks(queryRef.current.value, searchBar.mode)
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
        {showDrop && (
          <div className='status-drop-container'>
            <Drop>
              <p onClick={() => onFilterByStatus('completed')}>Completed</p>
              <p onClick={() => onFilterByStatus('pending')}>Pending</p>
            </Drop>
          </div>
        )}
      </div>
    </div>
  )
}

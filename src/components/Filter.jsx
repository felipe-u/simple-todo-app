import { useRef, useState } from 'react'
import '../styles/Filter.css'

export function Filter({ getTaskByTitleOrUserId }) {
  const [searchBar, setSearchBar] = useState({ show: false, mode: 'title' })
  const queryRef = useRef('')

  const showSearchBar = (mode) => {
    setSearchBar({ show: true, mode: mode })
  }

  const hideSearchBar = () => {
    setSearchBar((prev) => ({ ...prev, show: false }))
    getTaskByTitleOrUserId('', null)
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
              getTaskByTitleOrUserId(queryRef.current.value, searchBar.mode)
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

      <button>Status</button>
    </div>
  )
}

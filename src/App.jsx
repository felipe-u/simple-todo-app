import './styles/App.css'
import { Filter } from './components/Filter'
import { Table } from './components/Table'
import { Pagination } from './components/Pagination'
import { TaskForm } from './components/TaskForm'
import { useState } from 'react'

function App() {
  const [showTaskForm, setShowTaskForm] = useState(false)

  return (
    <main>
      <section className='filter-sec'>
        <Filter />
        <button className='primary-btn new-btn' onClick={() => setShowTaskForm(true)}>
          New Task
        </button>
      </section>

      <section>
        <Table />
      </section>

      <section>
        <Pagination />
      </section>

      {showTaskForm && (
        <div className='task-form-modal' onClick={() => setShowTaskForm(false)}>
          <TaskForm editMode={false} setShowTaskForm={setShowTaskForm} />
        </div>
      )}
    </main>
  )
}

export default App

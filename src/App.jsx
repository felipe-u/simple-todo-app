import './styles/App.css'
import { Filter } from './components/Filter'
import { Table } from './components/Table'
import { useTasks } from './hooks/useTasks'
import { Pagination } from './components/Pagination'
import { TaskForm } from './components/TaskForm'
import { useState } from 'react'

function App() {
  const {
    tasksToShow,
    limit,
    setLimit,
    numberOfPages,
    page,
    nextPage,
    prevPage,
    onSearchTasks,
    onFilterTasksByStatus,
    statusFilter,
    onCreateNewTask,
    onEditTask,
  } = useTasks()
  const [showTaskForm, setShowTaskForm] = useState(false)

  return (
    <main>
      <section className='filter-sec'>
        <Filter
          onSearchTasks={onSearchTasks}
          onFilterTasksByStatus={onFilterTasksByStatus}
          statusFilter={statusFilter}
        />
        <button className='primary-btn' onClick={() => setShowTaskForm(true)}>
          New Task
        </button>
      </section>

      <section>
        <Table tasks={tasksToShow} onEditTask={onEditTask} />
      </section>

      <section>
        <Pagination
          limit={limit}
          setLimit={setLimit}
          page={page}
          nextPage={nextPage}
          prevPage={prevPage}
          numberOfPages={numberOfPages}
        />
      </section>

      {showTaskForm && (
        <div className='task-form-modal' onClick={() => setShowTaskForm(false)}>
          <TaskForm
            onCreateNewTask={onCreateNewTask}
            setShowTaskForm={setShowTaskForm}
          />
        </div>
      )}
    </main>
  )
}

export default App

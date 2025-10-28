import './styles/App.css'
import { Filter } from './components/Filter'
import { Table } from './components/Table'
import { useTasks } from './hooks/useTasks'
import { Pagination } from './components/Pagination'

function App() {
  const {
    tasksToShow,
    limit,
    setLimit,
    numberOfPages,
    page,
    nextPage,
    prevPage,
    getTaskByTitleOrUserId,
  } = useTasks()

  return (
    <main>
      <section className='filter-sec'>
        <Filter getTaskByTitleOrUserId={getTaskByTitleOrUserId} />
        <button className='primary-btn'>New Task</button>
      </section>
      <section>
        <Table tasks={tasksToShow} />
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
    </main>
  )
}

export default App

import './styles/App.css'
import { Filter } from './components/Filter'
import { Table } from './components/Table'
import { useTodos } from './hooks/useTodos'

function App() {
  const { todos } = useTodos()

  return (
    <main>
      <section className='filter-sec'>
        <Filter />
        <button className='primary-btn'>New Task</button>
      </section>
      <section>
        <Table tasks={todos} />
      </section>
    </main>
  )
}

export default App

// https://dummyjson.com/docs/todos

import './styles/App.css'
import { Filter } from './components/Filter'
import { Table } from './components/Table'

function App() {
  return (
    <main>
      <section className='filter-sec'>
        <Filter />
        <button className='primary-btn'>New Task</button>
      </section>
      <section>
        <Table />
      </section>
    </main>
  )
}

export default App


// https://dummyjson.com/docs/todos
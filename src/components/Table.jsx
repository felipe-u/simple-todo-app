import '../styles/Table.css'

export function Table({ tasks }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Status</th>
            <th>User</th>
            <th></th>
          </tr>
        </thead>

        {tasks.length > 0 ? (
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.todo}</td>
                <td>{task.completed ? 'Completed' : 'Pending'}</td>
                <td>{task.userId}</td>
                <td>
                  <button>...</button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody className='no-results'>
            <tr>
              <td>No results</td>
            </tr>
          </tbody>
        )}
      </table>

      <div className='pagination-container'>
        <div className='rows-per-page'>
          <p>Rows per page</p>
          <select name='rows' id='rows'>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
          </select>
        </div>
        <div className='pages'>
          <p>Pages 1 of 4</p>
          <div className='pages-btn-container'>
            <button>◀</button>
            <button>▶</button>
          </div>
        </div>
      </div>
    </>
  )
}

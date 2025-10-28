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
    </>
  )
}

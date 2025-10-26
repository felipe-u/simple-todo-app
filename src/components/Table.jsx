import '../styles/Table.css'

export function Table() {
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

        <tbody>
          <tr>
            <td>12</td>
            <td>Design new brand for my mom</td>
            <td>Completed</td>
            <td>456</td>
            <td>
              <button>...</button>
            </td>
          </tr>
          <tr>
            <td>22</td>
            <td>Build some space stuff</td>
            <td>Pending</td>
            <td>456</td>
            <td>
              <button>...</button>
            </td>
          </tr>
          <tr>
            <td>66</td>
            <td>Buy some food for my cat</td>
            <td>Pending</td>
            <td>789</td>
            <td>
              <button>...</button>
            </td>
          </tr>
        </tbody>
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

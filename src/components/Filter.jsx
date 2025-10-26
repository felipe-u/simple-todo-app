import '../styles/Filter.css'

export function Filter() {
  return (
    <div className='filter-container'>
      <div className='filter-btn-container'>
        <button className='secondary-btn'>Filter By Title</button>
        <button className='secondary-btn'>Filter By User</button>
      </div>
      <button>Status</button>
    </div>
  )
}

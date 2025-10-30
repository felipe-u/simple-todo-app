import { useTasks } from '../hooks/useTasks'
import '../styles/Loader.css'

export function Loader() {
  const { loading } = useTasks()

  return (
    <>
      {loading && (
        <div className='loader-container'>
          <div className='loader'></div>
        </div>
      )}
    </>
  )
}

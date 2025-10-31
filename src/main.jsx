import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TasksProvider } from './context/tasks.jsx'
import { Toaster } from 'sonner'
import { Loader } from './components/Loader.jsx'

createRoot(document.getElementById('root')).render(
  <TasksProvider>
    <App />
    <Toaster id='global' />
    <Toaster id='confirm' position='top-center' />
    <Loader />
  </TasksProvider>
)

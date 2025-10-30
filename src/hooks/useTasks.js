import { useContext } from 'react'

import { TasksContext } from '../context/tasks'

export function useTasks() {
  const context = useContext(TasksContext)

  if (context === undefined) {
    throw new Error('useTasks must be withing a TasksProvider')
  }

  return context
}

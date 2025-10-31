import { toast } from 'sonner'
import { useTasks } from './useTasks'

export function useTasksUI() {
  const { onCreateNewTask, onEditTask, onDeleteTask, error } = useTasks()

  const safeCreateTask = async (form) => {
    try {
      await onCreateNewTask(form)
      toast.success('New Task Created', { toasterId: 'global' })
    } catch {
      toast.error(error, { toasterId: 'global' })
    }
  }

  const safeEditTask = async (form) => {
    try {
      await onEditTask(form)
      toast.success('Task Edited', { toasterId: 'global' })
    } catch {
      toast.error(error, { toasterId: 'global' })
    }
  }

  const safeDeleteTask = async (taskId) => {
    try {
      await onDeleteTask(taskId)
      toast.success('Task deleted', { toasterId: 'global' })
    } catch {
      toast.error(error, { toasterId: 'global' })
    }
  }

  return { safeCreateTask, safeEditTask, safeDeleteTask }
}

export class TaskModel {
  static create ({ task }) {
    const tasks = TaskModel.getAll()
    tasks.push(task)
    TaskModel.saveTasks({ tasks })
  }

  static getAll () {
    const tasksStorage = window.localStorage.getItem('tasks')
    try {
      return tasksStorage ? JSON.parse(tasksStorage) : []
    } catch (error) {
      console.error('Error parsing tasks from localStorage:', error)
      return []
    }
  }

  static saveTasks ({ tasks }) {
    const storage = window.localStorage
    storage.setItem('tasks', JSON.stringify(tasks))
  }

  static star ({ id }) {
    const tasks = TaskModel.getAll()
    tasks[id].starred = !tasks[id].starred

    TaskModel.saveTasks({ tasks })
  }

  static markCompleted ({ id }) {
    const tasks = TaskModel.getAll()
    tasks[id].completed = !tasks[id].completed

    TaskModel.saveTasks({ tasks })
  }

  static delete ({ id }) {
    const tasks = TaskModel.getAll()
    tasks.splice(id, 1)

    TaskModel.saveTasks({ tasks })
  }

  static update ({ id, updatedTask }) {
    const tasks = TaskModel.getAll()
    tasks[id] = {
      ...tasks[id],
      ...updatedTask
    }
    TaskModel.saveTasks({ tasks })
  }

  static get ({ id }) {
    const tasks = TaskModel.getAll()
    return tasks[id]
  }

  static getFilteredTasks ({ filter }) {
    const filters = ['all', 'completed', 'starred', 'pending']
    if (!filters.includes(filter)) throw new Error(`'${filter}' is not a valid filter.`)

    const tasks = TaskModel.getAll()
    let filteredTasks
    switch (filter) {
      case 'completed':
        filteredTasks = tasks.filter(task => task.completed)
        break
      case 'starred':
        filteredTasks = tasks.filter(task => task.starred)
        break
      case 'pending':
        filteredTasks = tasks.filter(task => !task.completed)
        break
      default:
        break
    }
    return filteredTasks
  }
}

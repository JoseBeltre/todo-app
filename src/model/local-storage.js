export class TaskModel {
  static create ({ task }) {
    const newTask = {
      ...task,
      id: crypto.randomUUID()
    }
    TaskModel.saveTask({ task: newTask })
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

  static saveTask ({ task }) {
    const tasks = TaskModel.getAll()
    tasks.push(task)

    window.localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  static star ({ id }) {
    const task = TaskModel.get({ id })
    task.starred = !task.starred

    TaskModel.update({ id, updatedTask: task })
  }

  static markCompleted ({ id }) {
    const task = TaskModel.get({ id })
    task.completed = !task.completed

    TaskModel.update({ id, updatedTask: task })
  }

  static delete ({ id }) {
    const tasks = TaskModel.getAll()
    const index = tasks.findIndex(task => task.id === id)
    tasks.splice(index, 1)

    window.localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  static update ({ id, updatedTask }) {
    const tasks = TaskModel.getAll()
    const index = tasks.findIndex(task => task.id === id)

    tasks[index] = {
      ...tasks[index],
      ...updatedTask
    }

    window.localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  static get ({ id }) {
    const tasks = TaskModel.getAll()
    const task = tasks.filter(task => task.id === id)
    return task[0]
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

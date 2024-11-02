export class TaskModel {
  static create ({ task }) {
    const storage = window.localStorage
    if (!storage.getItem('tasks')) storage.setItem('tasks', JSON.stringify([]))

    const tasks = JSON.parse(storage.getItem('tasks'))
    tasks.push(task)
    storage.setItem('tasks', JSON.stringify(tasks))
  }

  static getAll () {
    const storage = window.localStorage
    if (!storage.getItem('tasks')) return

    const tasks = JSON.parse(storage.getItem('tasks'))
    return tasks
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
    let tasks = TaskModel.getAll()
    tasks = tasks.splice(id, 1)

    TaskModel.saveTasks({ tasks })
  }
}

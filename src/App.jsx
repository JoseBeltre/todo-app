import { useEffect, useState } from 'react'

import './App.css'
import { SearchIcon } from './Components/svg/SearchIcon'
import { Task } from './Components/Task'
import { Filter } from './Components/Filter'
import { NewTaskButton } from './Components/NewTaskButton'
import { TaskModal } from './Components/TaskModal'
import { TaskModel } from './model/local-storage'
import { DeleteTaskModal } from './Components/DeleteTaskModal'

function App () {
  const [isNewTasksModalOpen, setIsNewTasksModalOpen] = useState(false)
  const [isDeleteTasksModalOpen, setIsDeleteTasksModalOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState()
  const [isEditTasksModalOpen, setIsEditTasksModalOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState()
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [filter, setFilter] = useState('Todas')
  const [orderBy, setOrderBy] = useState('Se vencen primero')

  useEffect(() => {
    let filtered
    switch (filter) {
      case 'Completadas':
        filtered = TaskModel.getFilteredTasks({ filter: 'completed' })
        break
      case 'Favoritas':
        filtered = TaskModel.getFilteredTasks({ filter: 'starred' })
        break
      case 'Pendientes':
        filtered = TaskModel.getFilteredTasks({ filter: 'pending' })
        break
      default:
        filtered = TaskModel.getAll()
        break
    }
    setTasks(filtered)
  }, [filter, isNewTasksModalOpen, isDeleteTasksModalOpen, isEditTasksModalOpen])

  useEffect(() => {
    const orderedTasks = [...tasks].sort((a, b) => {
      if (orderBy === 'Se vencen primero') return new Date(a.limitDate).getTime() - new Date(b.limitDate).getTime()
      if (orderBy === 'Se vencen último') return new Date(b.limitDate).getTime() - new Date(a.limitDate).getTime()
      if (orderBy === 'Más recientes') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (orderBy === 'Más antiguas') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      return new Date(a.limitDate).getTime() - new Date(b.limitDate).getTime()
    })
    setFilteredTasks(orderedTasks)
  }, [tasks, orderBy])

  return (
    <>
      <header className='p-1 border-b mb-5 flex justify-between 2xl:mt-10'>
        <h1 className='text-4xl font-bold'>Lista de Tareas</h1>

        <NewTaskButton openModal={() => setIsNewTasksModalOpen(!isNewTasksModalOpen)} classNames='hidden lg:flex' />

      </header>
      <main className='lg:grid lg:grid-cols-[auto_400px] lg:gap-6'>

        <nav className='mb-4 grid gap-2 h-fit lg:order-1'>

          <form className='search-form bg-itemBg flex'>

            <input type='text' name='search' placeholder='Buscar tarea...' className='flex-grow bg-transparent px-4 text-white/70 placeholder:text-white/30' />

            <button type='submit' className='p-3 px-4 bg-[#2f2f2f]'>
              <SearchIcon color='#D9A1E7' size='27px' />
            </button>

          </form>

          <Filter
            filterName='Mostrar'
            options={['Todas', 'Completadas', 'Pendientes', 'Favoritas']}
            selected={filter}
            onClick={(e) => {
              setFilter(e.target.textContent)
            }}
          />

          <Filter
            filterName='Ordenar por'
            options={['Más recientes', 'Más antiguas', 'Se vencen primero', 'Se vencen último']}
            selected={orderBy}
            onClick={(e) => {
              setOrderBy(e.target.textContent)
            }}
          />

          <NewTaskButton openModal={() => setIsNewTasksModalOpen(!isNewTasksModalOpen)} classNames='flex lg:hidden' />

        </nav>

        <section className='tasks grid gap-3 h-fit'>
          {filteredTasks &&
            filteredTasks.map(({ id, title, description, completed, starred, createdAt, limitDate }) => {
              return (
                <Task
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  isCompleted={completed}
                  isStarred={starred}
                  createdAt={createdAt}
                  limitDate={limitDate}
                  openDeleteModal={
                    () => {
                      setIsDeleteTasksModalOpen(!isDeleteTasksModalOpen)
                      setTaskToDelete(id)
                    }
                  }
                  openEditModal={
                    () => {
                      setIsEditTasksModalOpen(!isEditTasksModalOpen)
                      setTaskToEdit(id)
                    }
                  }
                />
              )
            })}
          {filteredTasks.length === 0 ? <p className='text-white/50 text-center lg:pt-10'>Aún no hay tareas a realizar...</p> : ''}
        </section>
        {
          isNewTasksModalOpen &&
            <TaskModal
              closeModal={() => setIsNewTasksModalOpen(!isNewTasksModalOpen)}
            />
        }
        {
          isDeleteTasksModalOpen &&
            <DeleteTaskModal
              closeModal={() => setIsDeleteTasksModalOpen(!isDeleteTasksModalOpen)}
              id={taskToDelete}
            />
        }
        {
          isEditTasksModalOpen &&
            <TaskModal
              isEditing
              closeModal={() => setIsEditTasksModalOpen(!isEditTasksModalOpen)}
              id={taskToEdit}
            />
        }
      </main>
    </>
  )
}

export default App

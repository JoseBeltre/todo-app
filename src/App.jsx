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
  const [tasks, setTasks] = useState(TaskModel.getAll())
  const [filter, setFilter] = useState()

  useEffect(() => {
    const getFilteredTasks = () => {
      switch (filter) {
        case 'Todas':
          setTasks(TaskModel.getAll())
          break
        case 'Completadas':
          setTasks(TaskModel.getFilteredTasks({ filter: 'completed' }))
          break
        case 'Favoritas':
          setTasks(TaskModel.getFilteredTasks({ filter: 'starred' }))
          break
        case 'Pendientes':
          setTasks(TaskModel.getFilteredTasks({ filter: 'pending' }))
          break
      }
    }

    getFilteredTasks()
  }, [filter])

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
          />

          <NewTaskButton openModal={() => setIsNewTasksModalOpen(!isNewTasksModalOpen)} classNames='flex lg:hidden' />

        </nav>

        <section className='tasks grid gap-3 h-fit'>
          {tasks &&
            tasks.map(({ title, description, completed, starred, createdAt, limitDate }, index) => {
              return (
                <Task
                  key={index}
                  id={index}
                  title={title}
                  description={description}
                  isCompleted={completed}
                  isStarred={starred}
                  createdAt={createdAt}
                  limitDate={limitDate}
                  openDeleteModal={
                    () => {
                      setIsDeleteTasksModalOpen(!isDeleteTasksModalOpen)
                      setTaskToDelete(index)
                    }
                  }
                  openEditModal={
                    () => {
                      setIsEditTasksModalOpen(!isEditTasksModalOpen)
                      setTaskToEdit(index)
                    }
                  }
                />
              )
            })}
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

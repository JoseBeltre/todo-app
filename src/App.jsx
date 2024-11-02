import { useState } from 'react'

import './App.css'
import { SearchIcon } from './Components/svg/SearchIcon'
import { Task } from './Components/Task'
import { Filter } from './Components/Filter'
import { NewTaskButton } from './Components/NewTaskButton'
import { AddTaskModal } from './Components/AddTaskModal'
import { TaskModel } from './model/local-storage'

function App () {
  const [isNewTasksModalOpen, setIsNewTasksModalOpen] = useState(false)
  const tasks = TaskModel.getAll()

  const handleModal = () => {
    setIsNewTasksModalOpen(!isNewTasksModalOpen)
  }

  return (
    <>
      <header className='p-1 border-b mb-5 flex justify-between'>
        <h1 className='text-4xl font-bold'>Lista de Tareas</h1>
        
        <NewTaskButton openModal={handleModal} classNames='hidden lg:flex' />

      </header>
      <main className='lg:grid lg:grid-cols-[auto_400px] lg:gap-6'>

        <nav className='mb-4 grid gap-2 h-fit lg:order-1'>

          <form className='search-form bg-itemBg flex'>

            <input type='text' name='search' placeholder='Buscar tarea...' className='flex-grow bg-transparent px-4 text-white/70 placeholder:text-white/30' />

            <button type='submit' className='p-3 px-4 bg-[#2f2f2f]'>
              <SearchIcon color='#D9A1E7' size='27px' />
            </button>

          </form>

          <Filter filterName='Mostrar' options={['Todas', 'Completadas', 'Pendientes', 'Favoritas']} />

          <Filter filterName='Ordenar por' options={['Más recientes', 'Más antiguas', 'Se vencen primero', 'Se vencen último']} />

          <NewTaskButton openModal={handleModal} classNames='flex lg:hidden' />

        </nav>

        <section className='tasks grid gap-3 h-fit'>
          {tasks &&
            tasks.map(({ title, description, completed, starred }, index) => {
              return (
                <Task key={index} id={index} title={title} description={description} isCompleted={completed} isStarred={starred} />
              )
            })}
        </section>
        {isNewTasksModalOpen && <AddTaskModal closeModal={handleModal} />}
      </main>
    </>
  )
}

export default App

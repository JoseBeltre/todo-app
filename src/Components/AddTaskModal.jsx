/* eslint-disable react/prop-types */
import { useState } from 'react'
import { FloatingInput } from './FloatingInput'
import { CloseIcon } from './svg/CloseIcon'
import { validateTask } from '../schemas/task.js'
import { TaskModel } from '../model/local-storage.js'

export function AddTaskModal ({ closeModal }) {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [year, setYear] = useState()
  const [month, setMonth] = useState()
  const [day, setDay] = useState()
  const [errorMsg, setErrorMsg] = useState()

  const showError = (error) => {
    setErrorMsg(error)
    setTimeout(() => {
      setErrorMsg('')
    }, 3000)
  }

  const createNewTask = () => {
    console.log('Validating...')
    let limitDate

    if (!description) {
      setDescription(undefined)
    }

    const createdAt = new Date()
    if (day && month && year) {
      limitDate = new Date(`${year}-${month}-${day}`)
    }

    const task = {
      title,
      description,
      createdAt,
      limitDate,
      completed: false,
      starred: false
    }

    try {
      const res = validateTask(task)
      if (!res.success) {
        if (res.error.errors[0].message === 'Invalid date') {
          return showError('Introduce una fecha válida.')
        }
        return showError(res.error.errors[0].message)
      }
      console.log('esta es la tarea desde afuera: ', task)
      TaskModel.create({ task })
      closeModal()
    } catch (error) {
      console.log('error de validacion: ', error)
    }
  }

  return (
    <div className='absolute backdrop-blur-sm left-0 top-0 w-screen h-screen p-4 flex items-center justify-center'>
      <div className='bg-itemBg p-4 w-full max-w-[500px]'>
        <div className='text-2xl font-bold border-b flex justify-between items-center'>
          <h3 className=' '>Nueva Tarea</h3>
          <button onClick={closeModal}>
            <CloseIcon size='30px' color='#fff' />
          </button>
        </div>
        <form
          className='mt-6 grid gap-6'
          onSubmit={(e) => {
            e.preventDefault()
            createNewTask()
          }}
        >
          <FloatingInput
            name='title'
            label='Titulo'
            onChange={e => setTitle(e.target.value)}
          />

          <FloatingInput
            name='description'
            label='Descripción (opcional)'
            onChange={e => setDescription(e.target.value)}
          />

          <div className='grid gap-4'>
            <h3 className='text-lg text-white/50'>Fecha limite (opcional)</h3>
            <div className='flex gap-4'>
              <FloatingInput
                name='day'
                label='Día'
                type='number'
                onChange={e => setDay(e.target.value)}
              />

              <FloatingInput
                name='month'
                label='Mes'
                type='number'
                onChange={e => setMonth(e.target.value)}
              />

              <FloatingInput
                name='year'
                label='Año'
                type='number'
                onChange={e => setYear(e.target.value)}
              />

            </div>
          </div>
          {errorMsg && <span className='text-red-300'>{errorMsg}</span>}
          <button
            type='submit'
            className='hover:bg-secondary hover:text-white border-2 p-2 font-bold text-lg bg-itemBg border-secondary text-secondary transition-colors'
          >
            Agregar nueva tarea
          </button>
        </form>
      </div>
    </div>
  )
}
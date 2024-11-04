import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FloatingInput } from './FloatingInput.jsx'
import { validateTask } from '../schemas/task.js'
import { TaskModel } from '../model/local-storage.js'
import { Modal } from './Modal.jsx'
import { FloatingTextarea } from './FloatingTextarea.jsx'

export function TaskModal ({ closeModal, isEditing, id }) {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [year, setYear] = useState()
  const [month, setMonth] = useState()
  const [day, setDay] = useState()
  const [errorMsg, setErrorMsg] = useState()

  useEffect(() => {
    if (isEditing) {
      const { title, description, limitDate } = TaskModel.get({ id })
      console.log('id desde useeffect ', id)

      setTitle(title)
      setDescription(description)
      if (limitDate) {
        const formattedLimitDate = new Date(limitDate)
        setDay(formattedLimitDate.getDay() + 1)
        setMonth(formattedLimitDate.getMonth() + 1)
        setYear(formattedLimitDate.getFullYear())
      }
    }
  }, [isEditing, id])

  const createTask = () => {
    const task = {
      title,
      description: !description ? undefined : description,
      createdAt: new Date(),
      limitDate: undefined,
      completed: false,
      starred: false
    }
    if (day && month && year) {
      task.limitDate = new Date(`${year}-${month}-${day}`)
    }

    const res = validateTask(task)
    if (!res.success) {
      return setErrorMsg(res.error.errors[0].message)
    }
    TaskModel.create({ task })
    closeModal()
  }

  const updateTask = ({ id }) => {
    const task = {
      title,
      description: !description ? undefined : description,
      limitDate: undefined
    }
    if (day && month && year) {
      task.limitDate = new Date(`${year}-${month}-${day}`)
    }
    TaskModel.update({ id, updatedTask: task })
    closeModal()
  }

  const handleFormSubmission = () => {
    if (isEditing) {
      updateTask({ id })
    } else {
      createTask()
    }
  }

  return (
    <Modal closeModal={closeModal} title={isEditing ? 'Editar Tarea' : 'Nueva Tarea'}>
      <form
        className='mt-6 grid gap-6'
        onSubmit={(e) => {
          e.preventDefault()
          handleFormSubmission()
        }}
      >
        <FloatingInput
          name='title'
          label='Titulo'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FloatingTextarea
          name='description'
          label='Descripción (opcional)'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className='grid gap-4'>
          <h3 className='text-lg text-white/50'>Fecha limite (opcional)</h3>
          <div className='flex gap-4'>
            <FloatingInput
              name='day'
              label='Día'
              type='number'
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />

            <FloatingInput
              name='month'
              label='Mes'
              type='number'
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />

            <FloatingInput
              name='year'
              label='Año'
              type='number'
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>
        {errorMsg && <span className='text-red-300'>{errorMsg}</span>}
        <button
          type='submit'
          className='hover:bg-secondary hover:text-white border-2 p-2 font-bold text-lg bg-itemBg border-secondary text-secondary transition-colors'
        >
          {isEditing ? 'Actualizar tarea' : 'Agregar nueva tarea'}
        </button>
      </form>
    </Modal>
  )
}

TaskModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

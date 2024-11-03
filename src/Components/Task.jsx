import { useState } from 'react'
import PropTypes from 'prop-types'
import { StarIcon } from './svg/StarIcon'
import { TrashIcon } from './svg/TrashIcon'
import { ExpandIcon } from './svg/ExpandIcon'
import { TaskModel } from '../model/local-storage'

export function Task ({ title, description = '', isCompleted, isStarred, createdAt, limitDate , id, openDeleteModal }) {
  const [starred, setStarred] = useState(isStarred)
  const [completed, setCompleted] = useState(isCompleted)
  const [expand, setExpand] = useState(false)

  const toggleCompleted = () => {
    TaskModel.markCompleted({ id })
    setCompleted(!completed)
  }
  const toggleStarred = () => {
    TaskModel.star({ id })
    setStarred(!starred)
  }

  let shortDescription
  if (expand) {
    shortDescription = description
  } else {
    shortDescription = description?.slice(0, 100) + (description?.length > 100 ? '...' : '')
  }

  const formattedCreatedAt = new Date(createdAt).toLocaleDateString('es-ES')

  let formattedlimitDate
  if (limitDate) {
    formattedlimitDate = new Date(limitDate).toLocaleDateString('es-ES')
  }

  return (
    <article className='task bg-itemBg p-4'>
      <div className='task-header flex items-center justify-between'>
        <h3 className='text-primary text-xl font-bold leading-5 mb-1'>{title}</h3>
        <div className='task-buttons flex gap-2 items-center'>
          <div className='flex gap-2 items-center'>
            <label htmlFor='mark-completed' />
            <input
              type='checkbox'
              name='mark-completed'
              id='mark-completed'
              className='border-2 border-white outline-none w-5 h-5 cursor-pointer'
              defaultChecked={completed}
              onClick={toggleCompleted}
            />
          </div>
          <button onClick={toggleStarred}>
            <StarIcon fill={starred} />
          </button>
          <button onClick={openDeleteModal}>
            <TrashIcon />
          </button>
        </div>
      </div>
      <div className='task-body overflow-hidden'>
        <p className='task-description text-pretty text-white/70 mr-24 font-light leading-4 mb-3'>
          {shortDescription}
        </p>
        {expand &&
          <ul className='leading-5'>
            <li>
              <span className='text-primary'>Anadida: </span>
              {formattedCreatedAt}
            </li>
            <li>
              <span className='text-primary'>Fecha limite: </span>
              {limitDate ? formattedlimitDate : 'Sin fecha limite'}
            </li>
          </ul>}
      </div>

      <button
        onClick={() => setExpand(!expand)}
        className='w-fit ml-auto flex items-center text-primary mt-2 border-transparent px-1 border-b italic hover:border-primary'
      >
        <span className='hidden md:inline-block'>
          {!expand ? 'Ampliar' : 'Ver menos'}
        </span>
        <ExpandIcon expand={expand} color='#D9A1E7' />
      </button>
    </article>
  )
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  limitDate: PropTypes.string,
  isCompleted: PropTypes.bool,
  isStarred: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  openDeleteModal: PropTypes.func.isRequired
}

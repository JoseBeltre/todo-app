/* eslint-disable react/prop-types */
import { useState } from 'react'
import { StarIcon } from './svg/StarIcon'
import { TrashIcon } from './svg/TrashIcon'
import { ExpandIcon } from './svg/ExpandIcon'
import { TaskModel } from '../model/local-storage'

export function Task ({ title, description, isCompleted, isStarred, id }) {
  const [starred, setStarred] = useState(isStarred)
  const [completed, setCompleted] = useState(isCompleted)

  const toggleCompleted = () => {
    TaskModel.markCompleted({ id })
    setCompleted(!completed)
  }
  const toggleStarred = () => {
    TaskModel.star({ id })
    setStarred(!starred)
  }

  return (
    <article className='bg-itemBg p-4'>
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
          <button>
            <TrashIcon />
          </button>
        </div>
      </div>
      <p className='task-description text-white/70 mr-24 font-light leading-4'>
        {description}
      </p>
      <button className='w-fit ml-auto flex items-center text-primary'>
        <span className='hidden md:inline-block'>Ampliar</span>
        <ExpandIcon expand color='#D9A1E7' />
      </button>
    </article>
  )
}

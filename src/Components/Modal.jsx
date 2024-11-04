import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { CloseIcon } from './svg/CloseIcon'

export function Modal ({ children, closeModal, title }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className='fixed backdrop-blur-sm left-0 top-0 bottom-0 right-0 p-4 flex items-center justify-center'>
      <div className='bg-itemBg p-4 w-full max-w-[500px]'>
        <div className='text-2xl font-bold border-b flex justify-between items-center'>
          <h3 className=' '>{title}</h3>
          <button onClick={closeModal}>
            <CloseIcon size='30px' color='#fff' />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired
}

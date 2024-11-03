/* eslint-disable react/prop-types */
import { Modal } from './Modal'
import { TaskModel } from '../model/local-storage'

export function DeleteTaskModal ({ closeModal, id }) {
  const eliminarTarea = () => {
    TaskModel.delete({ id })
    closeModal()
  }

  return (
    <Modal title='Eliminar tarea' closeModal={closeModal}>
      <p>¿Estás seguro que quieres eliminar esta tarea?</p>
      <div className='flex justify-end gap-2 mt-3 font-bold'>
        <button
          className='text-red-400 px-7 py-2 border border-red-400 hover:bg-red-400 hover:text-white transition-colors'
          onClick={closeModal}
        >
          Cancelar
        </button>
        <button
          className='text-green-500 px-7 py-2 border border-green-500 hover:bg-green-500 hover:text-white transition-colors'
          onClick={eliminarTarea}
        >
          Confirmar
        </button>
      </div>
    </Modal>
  )
}

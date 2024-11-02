import { Modal } from "./Modal"
import { TaskModel } from '../model/local-storage'

export function DeleteTaskModal({ closeModal, id }) {

	const eliminarTarea = () => {
			TaskModel.delete({ id })
	}

	return (
		<Modal title='Eliminar tarea' closeModal={closeModal}>
			<p>¿Estás seguro que quieres eliminar esta tarea?</p>
			<button onClick={closeModal}>Cancelar</button>
			<button onClick={eliminarTarea}>Confirmar</button>
		</Modal>
	)
}
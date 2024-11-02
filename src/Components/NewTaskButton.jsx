import { PlusIcon } from "./svg/PlusIcon"

export function NewTaskButton ({ openModal, classNames }) {
  return (
    <button onClick={openModal} className={'flex bg-itemBg p-2 pr-4 w-fit hover:bg-itemBgHover transition-colors' + classNames}>
      <PlusIcon size='26px' color='#fff' />
      Anadir nueva tarea
    </button>
  )
}
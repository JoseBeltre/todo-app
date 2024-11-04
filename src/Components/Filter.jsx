/* eslint-disable react/prop-types */
export function Filter ({ filterName, options, onClick, selected }) {
  return (
    <div className='flex gap-2'>
      <span className='text-primary'>{filterName}: </span>
      <div className='flex gap-2 items-center flex-wrap'>
        {
          options.map((option, index) => {
            return (
              <button
                key={index}
                className={`bg-itemBg p-0.5 px-3 text-white/60 font-light transition-colors 
                  ${selected === option ? 'bg-secondary text-white font-bold' : (!selected && option === 'Todas' ? 'bg-secondary text-white font-bold' : '')}`}
                onClick={onClick}
              >
                {option}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

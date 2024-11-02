/* eslint-disable react/prop-types */
export function Filter ({ filterName, options  }) {
  return (
    <div className='flex gap-2'>
    <span className='text-primary'>{filterName}: </span>
    <div className='flex gap-2 items-center flex-wrap'>
      {
        options.map((option, index) => {
          return <span key={index} className='bg-itemBg p-0.5 px-3 text-white/60 font-light'>{option}</span>
        })
      }
    </div>
  </div>
  )
}
/* eslint-disable react/prop-types */
export function FloatingInput ({ name, label, type = 'text', value, onChange }) {
  return (
    <div className='relative'>
      <input name={name} id={name} type={type} value={value} onChange={onChange} placeholder=' ' className='peer bg-itemBg w-full p-3 focus:outline-none border border-primary placeholder-shown:border-white/50' />
      <label htmlFor={name} className='text-primary absolute left-4 -top-3 bg-itemBg px-2 peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-3 transition-all'>{label}</label>
    </div>
  )
}

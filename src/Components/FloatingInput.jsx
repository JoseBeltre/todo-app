import PropTypes from 'prop-types'

export function FloatingInput ({ name, label, type = 'text', value, onChange }) {
  return (
    <div className='relative'>
      <input
        name={name}
        id={name}
        type={type}
        defaultValue={value}
        onChange={onChange}
        placeholder=' '
        className='peer bg-itemBg w-full p-3 focus:outline-none border border-primary placeholder-shown:border-white/50'
      />
      <label
        htmlFor={name}
        className='text-primary absolute left-4 -top-3 bg-itemBg px-2 peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-3 transition-all'
      >
        {label}
      </label>
    </div>
  )
}

FloatingInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func
}

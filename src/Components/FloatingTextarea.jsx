import PropTypes from 'prop-types'

export function FloatingTextarea ({ name, label, value, onChange }) {
  return (
    <div className='relative'>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder=' '
        rows='5'
        className='peer bg-itemBg w-full p-3 focus:outline-none border border-primary placeholder-shown:border-white/50 resize-none'
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

FloatingTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
}

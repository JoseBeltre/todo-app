import PropTypes from 'prop-types'
import { SearchIcon } from './svg/SearchIcon'

export function SearchBar ({ onInput }) {
  return (
    <form
      className='search-form bg-itemBg flex'
      onSubmit={e => e.preventDefault()}
    >
      <input
        type='text'
        name='search'
        placeholder='Buscar tarea...'
        className='flex-grow bg-transparent px-4 text-white/70 placeholder:text-white/30'
        onInput={onInput}
      />
      <button
        type='submit'
        className='p-3 px-4 bg-[#2f2f2f]'
      >
        <SearchIcon color='#D9A1E7' size='27px' />
      </button>
    </form>
  )
}

SearchBar.propTypes = {
  onInput: PropTypes.func.isRequired
}

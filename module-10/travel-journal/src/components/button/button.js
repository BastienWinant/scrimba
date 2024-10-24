import './button.css'
import PlusIcon from './e-add.svg'

export default function Button() {
  function handleClick() {
    console.log('I was clicked')
  }

  return (
    <button type='button' className='new-trip-btn' onClick={handleClick}>
      <img src={PlusIcon} className="plus-icon" alt="Plus icon." />
      <p>Add trip</p>
    </button>
  )
}
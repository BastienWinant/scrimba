import './button.css'
import PlusIcon from './e-add.svg'

export default function Button() {
  return (
    <button type='button' className='new-trip-btn'>
      <img src={PlusIcon} className="plus-icon" alt="Plus icon." />
      <p>Add trip</p>
    </button>
  )
}
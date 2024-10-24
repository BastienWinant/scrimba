import './Form.css'

export default function Form() {
  return (
    <form className='trip-form'>
      <h2 className='trip-form-title'>New trip</h2>
      <label className='input-group'>
        <h3 className='input-label'>image</h3>
        <input type='file' className='input-field' />
      </label>
      <label className='input-group'>
        <h3 className='input-label'>title</h3>
        <input type='text' className='input-field' placeholder='Eiffel Tour, Great Wall,...' autoFocus />
      </label>
      <label className='input-group'>
        <h3 className='input-label'>location</h3>
        <input type='text' className='input-field' />
      </label>
      <div className='date-inputs'>
        <label className='input-group'>
          <h3 className='input-label'>start date</h3>
          <input type='date' className='input-field' />
        </label>
        <label className='input-group'>
          <h3 className='input-label'>end date</h3>
          <input type='date' className='input-field' />
        </label>
      </div>
      <label className='input-group'>
        <h3 className='input-label'>description</h3>
        <textarea className='input-field description-input' maxLength="240"></textarea>
      </label>
      <button type='submit' className='input-field add-trip-btn'>Add Trip</button>
    </form>
  )
}
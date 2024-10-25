import './Form.css'
import { useState } from 'react'

export default function Form() {
  function handleSubmit(e) {
    e.preventDefault()
    console.log('adding trip')
  }

  return (
    <form className='trip-form' onSubmit={handleSubmit}>
      <h2 className='trip-form-title'>New trip</h2>
      <label className='input-group'>
        <h3 className='input-label'>Image</h3>
        <input type='file' className='input-field' />
      </label>
      <label className='input-group required'>
        <h3 className='input-label'>Title</h3>
        <input type='text' className='input-field' placeholder='Eiffel Tour, Great Wall,...' autoFocus required />
      </label>
      <label className='input-group required'>
        <h3 className='input-label'>Location</h3>
        <input type='text' className='input-field' required />
      </label>
      <div className='date-inputs'>
        <label className='input-group required'>
          <h3 className='input-label'>Start date</h3>
          <input type='date' className='input-field' required />
        </label>
        <label className='input-group required'>
          <h3 className='input-label'>End date</h3>
          <input type='date' className='input-field' required />
        </label>
      </div>
      <label className='input-group'>
        <h3 className='input-label'>Description (max 240 characters)</h3>
        <textarea className='input-field description-input' maxLength="240"></textarea>
      </label>
      <button type='submit' className='input-field add-trip-btn'>Add Trip</button>
    </form>
  )
}
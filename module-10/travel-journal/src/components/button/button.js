import './Button.css'

export default function Button(props) {
  return (
    <button type='button' className='new-trip-btn' onClick={props.onClick}>
      {props.btnText}
    </button>
  )
}
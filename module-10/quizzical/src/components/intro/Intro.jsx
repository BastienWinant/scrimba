import './Intro.css'

export default function Intro(props) {
  return (
    <div className="intro">
      <h1>Quizzical</h1>
      <p className="description">Some description if needed</p>
      <button
        className="btn new-quiz-btn"
        onClick={props.startQuiz}
      >
        Start quiz
      </button>
    </div>
  )
}
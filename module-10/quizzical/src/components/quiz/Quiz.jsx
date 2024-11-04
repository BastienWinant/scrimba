import './Quiz.css'

export default function Quiz(props) {
  return (
    <form method="post" className="quiz-form">
      <button type="submit" className="btn submit-quiz-btn">Check answers</button>
    </form>
  )
}
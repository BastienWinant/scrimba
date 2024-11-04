import './Quiz.css'
import MultipleChoiceQuestion from './multipleChoiceQuestion/MultipleChoiceQuestion'

export default function Quiz(props) {
  console.log(props.questions)
  return (
    <form method="post" className="quiz-form">
      <button type="submit" className="btn submit-quiz-btn">Check answers</button>
    </form>
  )
}
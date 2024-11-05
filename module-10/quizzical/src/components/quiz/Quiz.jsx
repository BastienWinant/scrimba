import './Quiz.css'
import MultipleChoiceQuestion from './multipleChoiceQuestion/MultipleChoiceQuestion'

export default function Quiz(props) {
  const mcqs = props.questions.map(question => {
    const answers = [question.correct_answer].concat(question.incorrect_answers)
    console.log(answers)

    return <MultipleChoiceQuestion
              question={question.question}
              answers={answers}
          />
  })
  return (
    <form method="post" className="quiz-form">
      <button type="submit" className="btn submit-quiz-btn">Check answers</button>
    </form>
  )
}
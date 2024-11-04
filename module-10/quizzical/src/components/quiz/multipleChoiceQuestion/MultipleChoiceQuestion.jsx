import './MultipleChoiceQuestion.css'

export default function MultipleChoiceQuestion(props) {
  return (
    <fieldset className="mcq">
      <legend className="question">this is the question</legend>
      <div className="answers"></div>
    </fieldset>
  )
}
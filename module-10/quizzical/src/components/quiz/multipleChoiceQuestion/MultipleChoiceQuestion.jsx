import './MultipleChoiceQuestion.css'

export default function MultipleChoiceQuestion(props) {
  const answers = props.answers.map(answer => {
    return <label>
              <input type="radio" name="answer" id="" />
          </label>
  })
  return (
    <fieldset className="mcq">
      <legend className="question">{props.question}</legend>
      <div className="answers"></div>
    </fieldset>
  )
}
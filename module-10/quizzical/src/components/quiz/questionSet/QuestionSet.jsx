import React from 'react'
import './QuestionSet.css'
import { nanoid } from 'nanoid'

export default function QuestionSet(props) {
  const answerOptions = props.question.options.map(option => {
    const answerId = nanoid()
    const checked = option === props.formData[props.question.id]
    const correctAnswer = props.question.correct_answer === option

    let style = {}
    if (props.disabled) { // if the quiz has been submitted
      if (correctAnswer) {
        style = {
          backgroundColor: '#94D7A2',
          border: '1px solid #94D7A2'
        }
      } else if (checked) {
        style = {
          backgroundColor: '#F8BCBC',
          border: '1px solid #F8BCBC',
          opacity: '.5'
        }
      } else {
        style = {
          opacity: '.5'
        }
      }
    }
    
    return <label htmlFor={answerId} key={answerId}>
            <input
              type="radio"
              id={answerId}
              name={props.question.id}
              value={option}
              checked={checked}
              onChange={props.handleChange}
              disabled={props.disabled}
            />
            <span style={style}>{option}</span>
          </label>
  })

  return (
    <fieldset className="question-set">
      <legend className="question">{props.question.question}</legend>
      <div className="answers">
        {answerOptions}
      </div>
    </fieldset>
  )
}
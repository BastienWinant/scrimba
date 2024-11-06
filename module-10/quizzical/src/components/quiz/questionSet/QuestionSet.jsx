import React from 'react'
import './QuestionSet.css'
import { nanoid } from 'nanoid'

export default function QuestionSet(props) {
  const answerOptions = props.question.options.map(option => {
    const answerId = nanoid()
    
    return <label htmlFor={answerId} key={answerId}>
            <input
              type="radio"
              id={answerId}
              name={props.question.id}
              value={option}
              checked={option === props.formData[props.question.id]}
              onChange={props.handleChange}
              disabled={props.disabled}
            />
            <span>{option}</span>
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
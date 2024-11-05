import React from 'react'
import './QuestionSet.css'

export default function QuestionSet(props) {
  return (
    <fieldset className="question-set">
      <legend className="question">{props.question.question}</legend>
    </fieldset>
  )
}
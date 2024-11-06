import React from 'react'
import './Quiz.css'
import QuestionSet from './questionSet/QuestionSet'

export default function Quiz(props) {
  const [formData, setFormData] = React.useState({})

  React.useEffect(() => {
    // select an answer at random for each question
    const defaultFormData = {}
    props.questions.forEach(question => {
      const randomIndex = Math.floor(Math.random() * question.options.length)
      defaultFormData[question.id] = question.options[randomIndex]
    })
    setFormData(defaultFormData)
  }, [])

  function handleClick() {
    console.log('Submitting the form...')
  }

  function handleChange(event) {
    const {name, value} = event.target

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const questionSets = props.questions.map(question => {
    return <QuestionSet
              key={question.id}
              question={question}
              formData={formData}
              handleChange={handleChange}
            />
  })

  return (
    <form method="post" className="quiz-form" onClick={handleClick}>
      {questionSets}
      <button className="btn submit-btn">Check answers</button>
    </form>
  )
}
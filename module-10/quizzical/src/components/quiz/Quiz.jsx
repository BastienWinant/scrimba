import React from 'react'
import './Quiz.css'
import QuestionSet from './questionSet/QuestionSet'

export default function Quiz(props) {
  const [formData, setFormData] = React.useState({})
  const [quizSubmitted, setQuizSubmitted] = React.useState(false)
  const [score, setScore] = React.useState(0)

  React.useEffect(() => {
    // select an answer at random for each question
    const defaultFormData = {}
    props.questions.forEach(question => {
      const randomIndex = Math.floor(Math.random() * question.options.length)
      defaultFormData[question.id] = question.options[randomIndex]
    })

    setFormData(defaultFormData)
  }, [])

  function submitAnswers(event) {
    event.preventDefault()

    let correctAnswerCount = 0

    for (const [questionId, answer] of Object.entries(formData)) {
      const question = props.questions.find(q => q.id === questionId)

      if (question.correct_answer === answer) {
        correctAnswerCount += 1
      }
    }

    setQuizSubmitted(true)
    setScore(correctAnswerCount)
  }

  function resetQuiz(event) {
    event.preventDefault()

    setQuizSubmitted(false)
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
    <form
      method="post"
      className="quiz-form"
      onSubmit={quizSubmitted ? resetQuiz : submitAnswers}
    >
      {questionSets}
      <div className='quiz-submit'>
        {quizSubmitted && <p className='score'>You scored {score}/{props.questions.length} correct answers</p>}
        <button className="btn submit-btn">
          {quizSubmitted ? "Play again" : "Check answers" }
        </button>
      </div>
    </form>
  )
}
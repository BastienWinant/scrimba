import React from 'react'
import './App.css'
import Intro from './components/intro/Intro'
import Quiz from './components/quiz/Quiz'

function App() {
  const [quizStarted, setQuizStarted] = React.useState(false)
  const [questions, setQuestions] = React.useState([])

  const startQuiz = () => {
    setQuizStarted(true)
    setQuestions([]) // TODO: fetch api data
  }

  return (
    <main>
      {
        quizStarted ?
          <Quiz /> :
          <Intro startQuiz={startQuiz} />
      }
    </main>
  )
}

export default App

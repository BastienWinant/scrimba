import React from 'react'
import './App.css'
import Intro from './components/intro/Intro'
import Quiz from './components/quiz/Quiz'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'
import data from './assets/data/questions.json'

function App() {
  const [quizStarted, setQuizStarted] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [apiError, setApiError] = React.useState(false)

  // only start the quiz if the questions array is filled
  React.useEffect(() => {
    setQuizStarted(questions.length > 0)
  }, [questions])

  function createQuiz() {
    // fetch('https://opentdb.com/api.php?amount=5')
    //   .then(res => res.json())
    //   .then(data => console.log(data))

    // verify that question data has been returned
    if (data.response_code === 0) {
      setQuestions(data.results.map(question => {
        // decode html entities in the raw data
        question.question = decode(question.question)
        question.correct_answer = decode(question.correct_answer)
        question.incorrect_answers = question.incorrect_answers.map(answer => decode(answer))
        
        question.options = [question.correct_answer]
          .concat(question.incorrect_answers) // combine all answers into one array
          .sort(() => Math.random() - 0.5) // shuffle the answers
        return {id: nanoid(), ...question}}))
    } else {
      setApiError(true)
    }
  }

  return (
    <main>
      {
        quizStarted ?
        <Quiz
          questions={questions}
          setQuizStarted={setQuizStarted}
        />
        :
        <Intro handleClick={createQuiz} apiError={apiError} />
      }
    </main>
  )
}

export default App

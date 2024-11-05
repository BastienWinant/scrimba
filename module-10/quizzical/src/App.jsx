import React from 'react'
import './App.css'
import Intro from './components/intro/Intro'
import Quiz from './components/quiz/Quiz'

function App() {
  const [quizStarted, setQuizStarted] = React.useState(false)
  const [questions, setQuestions] = React.useState([])

  // React.useEffect(() => {
  //   fetch('https://opentdb.com/api.php?amount=5')
  //     .then(res => res.json())
  //     .then(data => )
  // }, [])

  React.useEffect(() => {
    const data = {
      "response_code": 0,
      "results": [
        {
          "type": "boolean",
          "difficulty": "easy",
          "category": "Politics",
          "question": "Denmark has a monarch.",
          "correct_answer": "True",
          "incorrect_answers": [
              "False"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Comics",
          "question": "When was Marvel Comics founded?",
          "correct_answer": "1939",
          "incorrect_answers": [
              "1932",
              "1951",
              "1936"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "hard",
          "category": "Entertainment: Cartoon &amp; Animations",
          "question": "Which of the following films was Don Bluth both the writer, director, and producer for?",
          "correct_answer": "All Dogs Go To Heaven",
          "incorrect_answers": [
              "Titan A.E.",
              "Anastasia",
              "The Land Before Time"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Science: Computers",
          "question": "On Twitter, what was the original character limit for a Tweet?",
          "correct_answer": "140",
          "incorrect_answers": [
              "120",
              "160",
              "100"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "medium",
          "category": "Entertainment: Cartoon &amp; Animations",
          "question": "Who created &quot;RWBY&quot;?",
          "correct_answer": "Monty Oum",
          "incorrect_answers": [
              "Miles Luna",
              "Kerry Shawcross",
              "Shane Newville"
          ]
        }
      ]
    }

    setQuestions(data.results)
  }, [])

  const startQuiz = () => {
    setQuizStarted(true)
  }

  return (
    <main>
      {
        quizStarted ?
          <Quiz questions={questions} /> :
          <Intro startQuiz={startQuiz} />
      }
    </main>
  )
}

export default App

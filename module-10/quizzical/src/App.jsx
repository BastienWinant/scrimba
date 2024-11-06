import React from 'react'
import './App.css'
import Intro from './components/intro/Intro'
import Quiz from './components/quiz/Quiz'
import { nanoid } from 'nanoid'

function App() {
  const [quizStarted, setQuizStarted] = React.useState(false)
  const [questions, setQuestions] = React.useState([])

  // only start the quiz if the questions array is filled
  React.useEffect(() => {
    setQuizStarted(questions.length > 0)
  }, [questions])

  function createQuiz() {
    // fetch('https://opentdb.com/api.php?amount=5')
    //   .then(res => res.json())
    //   .then(data => console.log(data))
    const data = {
      "response_code": 0,
      "results": [
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Board Games",
          "question": "How many dice are used in the game of Yahtzee?",
          "correct_answer": "Five",
          "incorrect_answers": [
            "Four",
            "Six",
            "Eight"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "medium",
          "category": "Entertainment: Video Games",
          "question": "In the Portal series of games, who was the founder of Aperture Science?",
          "correct_answer": "Cave Johnson",
          "incorrect_answers": [
            "GLaDOs",
            "Wallace Breen",
            "Gordon Freeman"
          ]
        },
        {
          "type": "boolean",
          "difficulty": "easy",
          "category": "Entertainment: Video Games",
          "question": "In RuneScape, one must complete the &quot;Dragon Slayer&quot; quest before equipping Rune Platelegs.",
          "correct_answer": "False",
          "incorrect_answers": [
            "True"
          ]
        },
        {
          "type": "boolean",
          "difficulty": "hard",
          "category": "History",
          "question": "Japan was part of the Allied Powers during World War I.",
          "correct_answer": "True",
          "incorrect_answers": [
            "False"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "medium",
          "category": "Geography",
          "question": "Which Canadian province has Charlottetown as its capital?",
          "correct_answer": "Prince Edward Island",
          "incorrect_answers": [
            "Saskachewan",
            "Northwest Terrirories",
            "Ontario"
          ]
        }
      ]
    }

    // verify that question data has been returned
    if (data.response_code === 0) {
      setQuestions(data.results.map(question => {
        question.options = [question.correct_answer]
          .concat(question.incorrect_answers) // combine all answers into one array
          .sort(() => Math.random() - 0.5) // shuffle the answers
        return {id: nanoid(), ...question}}))
    } else {
      console.log('Error')
    }
  }

  return (
    <main>
      {
        quizStarted ?
        <Quiz questions={questions} />
        :
        <Intro handleClick={createQuiz} />
      }
    </main>
  )
}

export default App

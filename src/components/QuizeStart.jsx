import React from 'react'

export default function QuizeStart({startQuiz}) {
  return (
    <div className="quiz-start">
        <h1>Welcome to the Quiz!</h1>
        <button onClick={startQuiz} > Start Quiz</button>
    </div>
  )
}

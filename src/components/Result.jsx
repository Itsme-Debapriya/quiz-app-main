import React from "react";

function Result({ score, totalQuestions, restartQuiz, leaderboard }) {
	const resultMessage =
		score === totalQuestions
			? "Perfect! You answered all questions correctly!"
			: score / totalQuestions >= 0.7
			? "Great job! You're almost there!"
			: "Better luck next time! Keep practicing!";

	return (
		<div className="result">
			<h2>Quiz Completed!</h2>
			<p>You scored {score} out of {totalQuestions}.</p>
			<p>{resultMessage}</p>
			<button onClick={restartQuiz}>Start Again</button>
		</div>
	);
}

export default Result;
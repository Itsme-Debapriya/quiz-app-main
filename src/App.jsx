import React, { useEffect, useState } from "react";
import QuizeStart from "./components/QuizeStart";
import Result from "./components/Result";
import Question from "./components/Question";
import axios from "axios";
import "./App.css";

function App() {
	const [quizData, setQuizData] = useState(null);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [quizStarted, setQuizStarted] = useState(false);
	const [quizCompleted, setQuizCompleted] = useState(false);
	const [leaderboard, setLeaderboard] = useState([]);
	const [playerName, setPlayerName] = useState(""); // State to hold player's name

	// Fetching quiz data
	useEffect(() => {
		const fetchQuizData = async () => {
			try {
				const response = await axios.get(
					"https://api.allorigins.win/get?url=https://api.jsonserve.com/Uw5CrX"
				);

				// Parse nested API content if using allorigins
				const parsedData = JSON.parse(response.data.contents);

				if (parsedData && parsedData.questions) {
					setQuizData(parsedData);
				} else {
					console.error("Quiz data does not have the expected format.");
				}
			} catch (error) {
				console.error("Error fetching quiz data:", error);
			}
		};

		fetchQuizData();
	}, []);

	// Start Quiz
	const startQuiz = () => {
		const name = prompt("Please enter your name:"); // Prompt for player's name
		if (name) {
			setPlayerName(name); // Set player's name
			setQuizStarted(true);
			setScore(0);
			setCurrentQuestionIndex(0);
			setQuizCompleted(false);
		} else {
			alert("Name is required to start the quiz.");
		}
	};

	// Answering Question
	const answerQuestion = (selectedOptionId) => {
		if (!quizData || !quizData.questions || !quizData.questions[currentQuestionIndex]) {
			console.error("Invalid quiz data or question index.");
			return;
		}

		const currentQuestion = quizData.questions[currentQuestionIndex];

		// Check if the selected option is correct
		if (selectedOptionId) {
			setScore((prevScore) => prevScore + 1);
		}

		// Move to the next question or finish the quiz
		const nextQuestionIndex = currentQuestionIndex + 1;
		if (nextQuestionIndex < quizData.questions.length) {
			setCurrentQuestionIndex(nextQuestionIndex);
		} else {
			setQuizCompleted(true);
			updateLeaderboard(playerName, score+1); // Update leaderboard on completion
		}
	};

	// Update leaderboard
	const updateLeaderboard = (name, finalScore) => {
		const newEntry = { name, score: finalScore };
		setLeaderboard((prev) => {
			const updatedLeaderboard = [...prev, newEntry];
			// Sort leaderboard by score in descending order
			return updatedLeaderboard.sort((a, b) => b.score - a.score);
		});
	};

	// Restart the quiz
	const restartQuiz = () => {
		setQuizStarted(false);
		setScore(0);
		setCurrentQuestionIndex(0);
		setQuizCompleted(false);
		setPlayerName(""); // Reset player name
	};

	// Show loading state or message if quiz data isn't ready
	if (!quizData || !quizData.questions || quizData.questions.length === 0) {
		return <div>Loading or no quiz data available...</div>;
	}

	return (
		<div className="App">
			{!quizStarted ? (
				<QuizeStart startQuiz={startQuiz} />
			) : quizCompleted ? (
				<Result
					score={score}
					totalQuestions={quizData.questions.length}
					restartQuiz={restartQuiz}
					leaderboard={leaderboard}
				/>
			) : (
				<Question
					question={quizData.questions[currentQuestionIndex]}
					onAnswer={answerQuestion}
					questionIndex={currentQuestionIndex}
				/>
			)}
			<div className="leaderboard">
				<h2>Leaderboard</h2>
				<ul>
					{leaderboard.map((entry, index) => (
						<li key={index}>{index + 1}. {entry.name}   [ Score : {entry.score} ]</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
import React from "react";

function Question({ question, onAnswer, questionIndex }) {
	const { description, options } = question;
	return (
		<div className="question">
			<h3>
				Q{questionIndex + 1}. {description}
			</h3>{" "}
			{/* Display question number */}
			<div className="options">
				{options.map((option) => (
					<button
						key={option.id}
						onClick={() => onAnswer(option.is_correct)} // Pass option id when clicked
					>
						{option.description}
					</button>
				))}
			</div>  
		</div>
	);
}

export default Question;
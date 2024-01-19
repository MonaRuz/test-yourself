import Button from "./Button"

export default function TestButtons({
	onWrongAnswer,
	onCorrectAnswer,
	showAnswer,
	setShowAnswer,
	currentQuestion,
}) {
	return (
		<>
			{showAnswer && (
				<Button
					textColor='#ffb3ba'
					bgColor='#1c2129'
					onClick={onWrongAnswer}
				>
					✘
				</Button>
			)}
			{!showAnswer && (
				<Button
					textColor='#bae1ff'
					bgColor='#1c2129'
					onClick={() => setShowAnswer(true)}
				>
					Zobrazit odpověď
				</Button>
			)}

			{showAnswer && (
				<Button
					textColor='#baffc9'
					bgColor='#1c2129'
					onClick={() => onCorrectAnswer(currentQuestion?.id)}
				>
					✔
				</Button>
			)}
		</>
	)
}

import { useEffect, useState } from "react"
import data from "./data"

function Button({ textColor, bgColor, onClick, children }) {
	const buttonStyle = {
		padding: "10px",
		margin: "20px",
		fontSize: "18px",
		minWidth: "50px",
		height: "50px",
		color: textColor,
		backgroundColor: bgColor,
		border: `1px solid ${textColor}`,
	}

	const invertedStyle = {
		color: bgColor,
		backgroundColor: textColor,
		border: `1px solid ${bgColor}`,
	}

	return (
		<button
			style={buttonStyle}
			onMouseEnter={(e) => {
				e.currentTarget.style.color = invertedStyle.color
				e.currentTarget.style.backgroundColor = invertedStyle.backgroundColor
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.color = buttonStyle.color
				e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor
			}}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default function App() {
	const [showQuestions, setShowQuestions] = useState(false)
	const [showTest, setShowTest] = useState(false)
	const [questions, setQuestions] = useState(data)
	const [showResults, setShowResults] = useState(false)
	const [showAnswer, setShowAnswer] = useState(false)
	const [counter, setCounter] = useState(0)
	const [currentQuestion, setCurrentQuestion] = useState(
		questions[getRandomQuestion(0, questions.length)]
	)
	const [result, setResult] = useState(0)

	function handleShowQuestions() {
		setShowQuestions(!showQuestions)
		setShowTest(false)
	}

	function handleShowTest() {
		setShowTest(!showTest)
		setShowQuestions(false)
		setShowResults(false)
		setQuestions(data)
	}

	function getRandomQuestion(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min) + min)
	}

	function handleWrongAnswer() {
		setCurrentQuestion(questions[getRandomQuestion(0, questions.length)])
		setShowAnswer(false)
		setCounter((count) => count + 1)
	}

	function handleCorrectAnswer(id) {
		let updatedQuestions = questions.filter((question) => {
			return question.id !== id
		})
		setQuestions(updatedQuestions)
		setShowAnswer(false)
		setCurrentQuestion(
			updatedQuestions[getRandomQuestion(0, updatedQuestions.length)]
		)
		setResult(Math.ceil(100 - (counter / (data.length + counter)) * 100))
		if (questions.length < 2) {
			setShowResults(true)
			setShowTest(false)
		}
	}

	useEffect(() => {
		if (showTest) {
			setCurrentQuestion(questions[getRandomQuestion(0, questions.length)])
		}
	}, [showTest])

	return (
		<div>
			<header>
				<h1>
					TestYS...<span> Otestuj své znalosti</span>
				</h1>
			</header>

			<div className='container'>
				{!showTest && (
					<Button
						textColor='#ffffba'
						bgColor='#1c2129'
						onClick={handleShowQuestions}
					>
						{!showQuestions ? "Zobrazit otázky" : "Skrýt otázky"}{" "}
					</Button>
				)}

				<Button
					textColor='#ffffba'
					bgColor='#1c2129'
					onClick={handleShowTest}
				>
					{!showTest ? "Spustit test" : "Přerušit test"}
				</Button>
			</div>
			{showResults && <p className='result'>Úspěšnost testu byla {result}%</p>}

			{showQuestions && <Questions />}
			{showTest && (
				<Test
					questions={questions}
					currentQuestion={currentQuestion}
					showAnswer={showAnswer}
					onWrongAnswer={handleWrongAnswer}
					onCorrectAnswer={handleCorrectAnswer}
					setShowAnswer={setShowAnswer}
				/>
			)}
		</div>
	)
}

function Questions() {
	return data.map((question) => (
		<div className='question' key={question.id}>
			<p>
				Otázka: <span>{question.question}</span>
			</p>
			<p>
				Odpověď: <span>{question.answer}</span>
			</p>
		</div>
	))
}

function Test({
	currentQuestion,
	showAnswer,
	onWrongAnswer,
	onCorrectAnswer,
	setShowAnswer,
}) {
	return (
		<div>
			<div className='question'>
				<p>{currentQuestion?.question}</p>
				{showAnswer && <p>{currentQuestion?.answer}</p>}
			</div>

			<div className='answer'>
				<Button
					textColor='#ffb3ba'
					bgColor='#1c2129'
					onClick={onWrongAnswer}
				>
					✘
				</Button>
				<Button
					textColor='#bae1ff'
					bgColor='#1c2129'
					onClick={() => setShowAnswer(true)}
				>
					Zobrazit odpověď
				</Button>
				<Button
					textColor='#baffc9'
					bgColor='#1c2129'
					onClick={() => onCorrectAnswer(currentQuestion?.id)}
				>
					✔
				</Button>
			</div>
		</div>
	)
}

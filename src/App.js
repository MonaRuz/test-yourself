import { useEffect, useState } from "react"
import data from "./data"
import Button from "./Button"



export default function App() {
	const [showQuestions, setShowQuestions] = useState(false)
	const [showTest, setShowTest] = useState(false)
	const [showResults, setShowResults] = useState(false)
	const [showAnswer, setShowAnswer] = useState(false)
	const [questions, setQuestions] = useState(data)
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
			<Header />
			<AppButtons
				showTest={showTest}
				showQuestions={showQuestions}
				onShowTest={handleShowTest}
				onShowQuestions={handleShowQuestions}
			/>

			{showResults && <Results result={result} />}
			{showQuestions && <Questions />}
			{showTest ? (
				<Test
					currentQuestion={currentQuestion}
					showAnswer={showAnswer}
				>
					<TestButtons
						onWrongAnswer={handleWrongAnswer}
						onCorrectAnswer={handleCorrectAnswer}
						setShowAnswer={setShowAnswer}
						currentQuestion={currentQuestion}
					/>
				</Test>
			) : (
				!showResults && <Intro />
			)}
		</div>
	)
}

function Header() {
	return (
		<header>
			<h1>
				TestYS...<span> Otestuj své znalosti</span>
			</h1>
		</header>
	)
}

function AppButtons({ showTest, onShowQuestions, showQuestions, onShowTest }) {
	return (
		<div className='container'>
			{!showTest && (
				<Button
					textColor='#ffffba'
					bgColor='#1c2129'
					onClick={onShowQuestions}
				>
					{!showQuestions ? "Zobrazit otázky" : "Skrýt otázky"}{" "}
				</Button>
			)}

			<Button
				textColor='#ffffba'
				bgColor='#1c2129'
				onClick={onShowTest}
			>
				{!showTest ? "Spustit test" : "Přerušit test"}
			</Button>
		</div>
	)
}

function TestButtons({
	onWrongAnswer,
	onCorrectAnswer,
	setShowAnswer,
	currentQuestion,
}) {
	return (
		<>
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
		</>
	)
}

function Questions() {
	return data.map((question) => <Question question={question} />)
}

function Question({ question }) {
	return (
		<div
			className='question'
			key={question.id}
		>
			<p>
				Otázka: <span>{question.question}</span>
			</p>
			<p>
				Odpověď: <span>{question.answer}</span>
			</p>
		</div>
	)
}

function Test({ currentQuestion, showAnswer, children }) {
	return (
		<div>
			<div className='question'>
				<p>{currentQuestion?.question}</p>
				{showAnswer && <p>{currentQuestion?.answer}</p>}
			</div>

			<div className='answer'>{children}</div>
		</div>
	)
}

function Results({ result }) {
	return <p className='result'>Úspěšnost testu byla {result}%</p>
}

function Intro() {
	return (
		<div className='intro'>
			<p>
				Vlož otázky s odpověďmi, spusť test a procvičuj své znalosti v
				jakémkoliv oboru.
			</p>
			<p>Po zobrazení otázky se snaž odpovědět co nejpřesněji na otázku. </p>
			<p>Pak si zobraz pro kontrolu odpověď a ohodnoť se.</p>
			<p>
				Když označíš otázku jako správně zodpovězenou, znovu se ti nezobrazí.
			</p>
			<p>
				Když označíš otázku jako špatně nebo neúplně zodpovězenou, otázka se ti
				bude náhodně zobrazovat znovu, dokud odpověď na ní neoznačíš jako
				správnou.
			</p>
			<p>
				V závěru testu se ti zobrazí procentuální úspěšnost, tedy kolik odpovědí
				bylo správně vůči celkovému množství zodpovězených otázek.
			</p>
		</div>
	)
}

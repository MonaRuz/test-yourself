import { useState } from "react"
import data from "./data"
import Button from "./Button"

export default function App() {
	const [showQuestions, setShowQuestions] = useState(false)
	const [showTest, setShowTest] = useState(false)
	const [counter, setCounter] = useState(0)
	const result = Math.ceil(100 - (counter / (data.length + counter)) * 100)

	function handleShowQuestions() {
		setShowQuestions(!showQuestions)
		setShowTest(false)
	}

	function handleShowTest() {
		setShowTest(!showTest)
		setShowQuestions(false)
	}

	function handleCounter() {
		setCounter()
	}
	return (
		<>
			<Header />
			{!showTest && !showQuestions && <Intro />}
			<AppButtons
				showTest={showTest}
				showQuestions={showQuestions}
				onShowTest={handleShowTest}
				onShowQuestions={handleShowQuestions}
			/>

			{showQuestions && <Questions />}
			{showTest && (
				<Test
					result={result}
					onCounter={handleCounter}
				/>
			)}
		</>
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
		<div className='button-box'>
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
				{!showTest ? "Spustit test" : "Ukončit test"}
			</Button>
		</div>
	)
}

function Questions() {
	return data.map((question) => (
		<Question
			question={question}
			key={question.id}
		/>
	))
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

function Test({ result, onCounter }) {
	const [showAnswer, setShowAnswer] = useState(false)

	const [questions, setQuestions] = useState(data)
	const [currentQuestion, setCurrentQuestion] = useState(
		questions[getRandomQuestion(0, questions.length)]
	)

	function getRandomQuestion(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min) + min)
	}

	function handleWrongAnswer() {
		setCurrentQuestion(questions[getRandomQuestion(0, questions.length)])
		setShowAnswer(false)
		onCounter((count) => count + 1)
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
	}

	if (questions.length !== 0)
		return (
			<div>
				<>
					<div className='question'>
						<p>{currentQuestion?.question}</p>
						{showAnswer && <p>{currentQuestion?.answer}</p>}
					</div>
					<div className='button-box'>
						<TestButtons
							onWrongAnswer={handleWrongAnswer}
							onCorrectAnswer={handleCorrectAnswer}
							showAnswer={showAnswer}
							setShowAnswer={setShowAnswer}
							currentQuestion={currentQuestion}
						/>
					</div>
				</>
			</div>
		)
	if (questions.length === 0)
		return <p className='result'>Úspěšnost testu byla {result}%</p>
		
}

function TestButtons({
	onWrongAnswer,
	onCorrectAnswer,
	showAnswer,
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
			{!showAnswer && (
				<Button
					textColor='#bae1ff'
					bgColor='#1c2129'
					onClick={() => setShowAnswer(true)}
				>
					Zobrazit odpověď
				</Button>
			)}

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
			<p>Aby se zobrazil výsledek testu, musí bý všechny otázky zodpovězeny!</p>
		</div>
	)
}

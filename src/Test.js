import { useState } from "react"
import Button from "./Button"


export default function Test({questions,setQuestions,data}) {
    const [showAnswer, setShowAnswer] = useState(false)
	const [percentCouter, setpercentCouter] = useState(0)
	const [progress,setProgress]=useState(1)

	
	const [currentQuestion, setCurrentQuestion] = useState(
		questions[getRandomQuestion(0, questions.length)]
	)
	const result = Math.ceil(100 - (percentCouter / (questions.length + percentCouter)) * 100)

	

	function getRandomQuestion(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min) + min)
	}

	function handleWrongAnswer() {
		setCurrentQuestion(questions[getRandomQuestion(0, questions.length)])
		setShowAnswer(false)
		setpercentCouter(percentCouter+1)
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
		setProgress(progress+1)
	}



	if (questions.length !== 0)
		return (
			<div className="test-box">
				<div className='test-question'>
					<p>{currentQuestion?.question}</p>
					{showAnswer && <p>{currentQuestion?.answer}</p>}
				</div>
				<div className='button-box'>
				{showAnswer && (
				<Button
					textColor='#ffb3ba'
					bgColor='#1c2129'
					onClick={handleWrongAnswer}
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
					onClick={() => handleCorrectAnswer(currentQuestion?.id)}
				>
					✔
				</Button>
			)}
				</div>
				<div>
					<p className="ongoing-result">Průběh:<strong className="ongoing-percent"> {progress}/{data.length}</strong> </p>
				</div>
			</div>
		)
	if (questions.length === 0)
		return <p className='result'>Úspěšnost testu byla {result}%</p>
}

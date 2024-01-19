import { useEffect, useState } from "react"
import Header from "./Header"
import AppButtons from "./AppButtons"
import Questions from "./Questions"
import Test from "./Test"
import Intro from "./Intro"

export default function App() {
	const [showQuestions, setShowQuestions] = useState(false)
	const [showTest, setShowTest] = useState(false)
	const [data, setData] = useState([])
	const [questions, setQuestions] = useState([])

	function handleShowQuestions() {
		setShowQuestions(!showQuestions)
		setShowTest(false)
	}

	function handleShowTest() {
		setShowTest(!showTest)
		setShowQuestions(false)
	}

	useEffect(function () {
		async function getQuestions() {
			const res = await fetch("http://localhost:8000/questions")
			const data = await res.json()
			setQuestions(data)
			setData(data)
		}
		getQuestions()
	}, [])

	return (
		<>
			<Header />
			<AppButtons
				showTest={showTest}
				showQuestions={showQuestions}
				onShowTest={handleShowTest}
				onShowQuestions={handleShowQuestions}
			/>

			{!showTest && !showQuestions && <Intro />}
			{showQuestions && <Questions data={data} />}
			{showTest && (
				<Test
					questions={questions}
					setQuestions={setQuestions}
					data={data}
				/>
			)}
		</>
	)
}

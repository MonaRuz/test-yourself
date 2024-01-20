import { useEffect, useReducer, useState } from "react"
import Header from "./Header"
import AppButtons from "./AppButtons"
import Questions from "./Questions"
import Test from "./Test"
import Intro from "./Intro"
import Error from "./Error"

function reducer(state,action){
	switch(action.type){
		case "setQuestions":
			return{questions:action.payload,data:action.payload,status:"ready"}	
		case "dataFailed":
			return{...state,status:"error"}	
		default:
			throw new Error("Unknown action")	
	}
}

export default function App() {
	const [showQuestions, setShowQuestions] = useState(false)
	const [showTest, setShowTest] = useState(false)
	// const [data, setData] = useState([])
	// const [questions, setQuestions] = useState([])
	const initialState={questions:[],data:[],status:"loading"}

	const[{questions,data,status},dispatch]=useReducer(reducer,initialState)

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
			try{const res = await fetch("http://localhost:8000/questions")
			if(!res.ok)throw new Error("Something went wrong with data fetching.")
			const data = await res.json()
			dispatch({type:"setQuestions",payload:data})}catch(err){
				dispatch({type:"dataFailed"})
			}
		}
		getQuestions()
	}, [])

	return (
		<>
			<Header />
			{status === "ready"&&<AppButtons
				showTest={showTest}
				showQuestions={showQuestions}
				onShowTest={handleShowTest}
				onShowQuestions={handleShowQuestions}
			/>}
			{status === "error"&&<Error/>}
			{status !=="error" && !showTest && !showQuestions &&<Intro />}
			{showQuestions && <Questions data={data} />}
			{showTest && (
				<Test
					questions={questions}
					// setQuestions={setQuestions}
					data={data}
				/>
			)}
		</>
	)
}

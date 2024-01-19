import Question from "./Question"

export default function Questions({data}) {
    return data.map((question) => (
		<Question
			question={question}
			key={question.id}
		/>
	))
}

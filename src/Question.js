

export default function Question({question}) {
    return (
		<div
			className='question-list'
			key={question.id}
		>
			<h3>
				{question.question}
			</h3>
			<p>
				Odpověď: <span>{question.answer}</span>
			</p>
		</div>
	)
}

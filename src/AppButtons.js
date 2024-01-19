import Button from "./Button"

export default function AppButtons({ showTest, onShowQuestions, showQuestions, onShowTest }) {
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

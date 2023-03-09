export default function Result(props) {
    let answers = props.question.answersArr

    let isAnswered = props.question.isAnswered
    let answeredCorrectly = props.question.answeredCorrectly

    let divQuestionAndAnswersCSSClass = isAnswered && answeredCorrectly ? "question--and--answers--div--correct" : "question--and--answers--div--incorrect"

    return (
        <div className={divQuestionAndAnswersCSSClass}>
            <h2 className="question">{props.question.text}</h2>
            <div className="answers--div">

                {answers.map(answer => {
                    const cssClasses = {
                        answerSpan: "answer--span",
                        incorrectSelected: answer.isSelected && !answer.isCorrect && "incorrect--selected",
                        correctSelected: answer.isSelected && answer.isCorrect && "correct--selected",
                        correctNotSelected: !answer.isSelected && answer.isCorrect && "correct--not--selected",
                    }
                    return (
                        <span
                            style={{ cursor: "default" }}
                            key={answer.id}
                            className={`${cssClasses.answerSpan} ${cssClasses.incorrectSelected}  ${cssClasses.correctNotSelected} ${cssClasses.correctSelected}`}
                        >
                            {answer.text}
                        </span>)
                }
                )}

            </div>
        </div>
    )
}
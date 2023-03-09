export default function Question(props) {
    let answers = props.question.answersArr

    return (
        <div className="question--and--answers--div">
            <h2 className="question">{props.question.text}</h2>
            <div className="answers--div">

                {answers.map(answer => {
                    return (
                        <span
                            key={answer.id}
                            // onClick => change styling and isSelected property value
                            // based on clicked answer, first set all to false, then ovewrite selected (not very intelligent solution)
                            // then pass back Question ID and Answer ID
                            onClick={() => {
                                for (let a of answers) {
                                    a.isSelected = false
                                }
                                answer.isSelected = true

                                return props.selectAnswer(props.question.id, answer.id)
                            }
                            }
                            className={answer.isSelected
                                ? "answer--span selected"
                                : "answer--span not--selected"}
                        >
                            {answer.text}
                        </span>)
                }
                )}
            </div>
        </div>
    )
}
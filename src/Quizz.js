import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { decode } from 'html-entities'; // replaces html entities chars

import Question from "./Question"
import Result from "./Result"


export default function Quizz(props) {

    const [questions, setQuestions] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [score, setScore] = useState(0)

    const [catName, catIcon, catID] = props.quizInstance.category  // Array containing name, icon, id

    // construct querystring, if no difficulty and type set => blank, else url should look like:
    // https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple
    const difficulty = props.quizInstance.difficulty
    const difficultyQuerystring = difficulty === "any" ? "" : `&difficulty=${difficulty}`

    const quizType = props.quizInstance.quizType
    const quizTypeQuerystring = quizType === "any" ? "" : `&type=${quizType}`


    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=10&category=${catID}${difficultyQuerystring}${quizTypeQuerystring}`)
            .then(response => response.json())
            .then(data => generateQuestionsArr(data.results))
    }, [])


    function generateQuestionsArr(data) {
        let questionsArr = []

        for (let q of data) {
            /** create answers Array for each question. 
                Shuffle func creates answer objects with decoded text,
                attaches isSelected and isCorrect properties, returns arr of answers */
            // const [answersArr, setAnswersArr] = useState(shuffleAnswers(q.correct_answer, q.incorrect_answers))
            const answersArr = shuffleAnswers(q.correct_answer, q.incorrect_answers)

            questionsArr.push(
                {
                    id: nanoid(),
                    text: decode(q.question),
                    answersArr: answersArr,
                    isAnswered: false,
                    answeredCorrectly: false,
                }
            )
        }
        // N.B. Set questions state with the newly created array, not the data from API! 
        setQuestions(questionsArr)
    }


    function shuffleAnswers(correctAnswerText, incorrectAnswersTexts) {
        let answersAsObjects = []

        let correctAnswer = {
            id: nanoid(),
            text: decode(correctAnswerText),        // decode removes html entities chars
            isSelected: false,
            isCorrect: true,
        }
        answersAsObjects.push(correctAnswer)

        for (let a of incorrectAnswersTexts) {
            let answerObj = {
                id: nanoid(),
                text: decode(a),
                isSelected: false,
                isCorrect: false,
            }
            answersAsObjects.push(answerObj)
        }
        for (let i = answersAsObjects.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [answersAsObjects[i], answersAsObjects[j]] = [answersAsObjects[j], answersAsObjects[i]];
        }

        return answersAsObjects
    }


    function selectAnswer(questionID, answerID) {

        setQuestions(prevArr => prevArr.map(question => {
            if (question.id !== questionID) { // if not the selected question
                return question
            } else {
                let newAnswersArr = question.answersArr.map(answer =>
                    answer.id === answerID
                        ? {
                            ...answer,
                            isSelected: true
                        }
                        : {
                            ...answer,
                            isSelected: false
                        }
                )

                return {
                    ...question,
                    answersArr: newAnswersArr,
                    isAnswered: true
                }
            }
        }))
    }

    // ... AND finally - render page
    // If response NOT empty json
    if (questions.length > 0) {

        // If rendering QUIZ
        if (!hasSubmitted) {
            const questionElements = questions.map(q =>
                <Question
                    question={q}
                    key={q.id}
                    selectAnswer={selectAnswer} />) // will get back question and answer IDs

            return (
                <div className="quiz--container">
                    <div className="quiz--info">
                        <div>category: <span>{catName}</span></div>
                        <div>difficulty: <span>{difficulty}</span></div>
                        <div>type: <span>{quizType}</span></div>
                    </div>
                    {questionElements}
                    <div className="btn--and--result">
                        <button id="checkAnswers" onClick={checkAnswers}>Check answers</button>
                    </div>
                </div>
            )
        }

        // If rendering RESULTS
        else {
            const questionElements = questions.map(q =>
                <Result
                    question={q}
                    key={q.id} />)

            return (
                <div className="quiz--container">
                    <div className="quiz--info">
                        <div>category: <span>{catName}</span></div>
                        <div>difficulty: <span>{difficulty}</span></div>
                        <div>type: <span>{quizType}</span></div>
                    </div>

                    {questionElements}
                    <div className="btn--and--result">
                        <button id="restartBtn" onClick={props.handleClick}>Restart app</button>
                        <div id="result">Correct: <b>{score} / {questions.length}</b></div>
                    </div>
                </div>
            )
        }
    }

    // If response EMPTY json 
    else {
        return (
            <div className="quiz--container">
                <div className="no--data">
                    <h2>No valid response for:</h2>
                    <div>category: <span>{catName}</span></div>
                    <div>difficulty: <span>{difficulty}</span></div>
                    <div>type: <span>{quizType}</span></div>
                    <h2> Request to <a href={`https://opentdb.com/api.php?amount=10&category=${catID}&difficulty=${difficulty}&type=${quizType}`} target="_blank">this url</a> returned nothing.</h2>
                </div>
                <div className="btn--and--result">
                    <button id="restartBtn" onClick={props.handleClick}>Restart app</button>
                </div>
            </div>
        )
    }


    // This function will change state of hasSubmitted, therefore will cause rerendering, 
    // then if hasSubmitted == true will go to results page, not very elegant
    function checkAnswers() {
        setHasSubmitted(true)
        for (let q of questions) {
            let correctAnswerIndex = q.answersArr.indexOf(q.answersArr.find(a => a.isCorrect))
            let givenAnswerIndex = q.answersArr.indexOf(q.answersArr.find(a => a.isSelected))
            if (correctAnswerIndex === givenAnswerIndex) {
                q.answeredCorrectly = true
                setScore(prevValue => prevValue + 1)
            }
        }
        return score
    }
}

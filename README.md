# QUI(ck)QUI(z)
**Basic project created React**

***The web application has been deployed [HERE](https://loquacious-heliotrope-bfb2d9.netlify.app/)***

***It utilizes the API of [Open Trivia Databse](https://opentdb.com/api_config.php)***
### Description
The landing page asks the user to configure what the quiz they wish to be asked - topic, difficulty, type of questions.
Once this has been done, the "Go" button will be displayed and a request to the API will be sent. 
The quiz will consist of 10 questions with the selected properties.
Once the questions have been answered (or have been left unanswered), the app will verify 
the answers and will change the appearance of each question depending on whether 
it has been answered correctly. It will also count the correct answers.

### App.js
Once the app is launched a state for startScreen will be initialized with an initial value of **true**
`const [startScreen, setStartScreen] = React.useState(true)`
The `function toggleScreen`  toggles the state and is passed to  the Welcome component if its value is true (original value) or Quizz component if false (in other words if toggleScreen has been triggered). 
```
{startScreen
        ? <Welcome handleClick={toggleScreen} />
        : <Quizz handleClick={toggleScreen} quizInstance={quizInstance} />}
```
It also accepts arguments and depending on their values creates a quizInstance which is passed to Quiz.js
This Welcome component will collect the user input (quiz selection) and upon clicking the button GO will trigger the function which will in turn set the startScreen state to false (and create a quizInstance as well, see below).
Once the value of setStartScreen is set to false the app will render the actual quiz (with the newly created quizInstance.


### Welcome.js
This component creates states for categorySelected, difficultySelected, typeSelected. The user selection is passed to App.js upon clicking the "Go!" button
          
```
      <button id="goBtn" onClick={() => props.handleClick(categorySelected, difficultySelected, typeSelected)}>
                    GO!
                </button>
```
Now in App.js toggleScreen is triggered, startScreen is set to false, a quizInstance is created - an object with properties

```
 {
          category,
          difficulty,
          quizType
        }
```
The page is re-rendered but since this time  the value of startScreen is set to **false** the component Quizz will render with the quizInstance passed to it.

### Quizz.js
In this component we create a state for the questions to be later displayed (initially an empty array) and for hasSubmitted (initially false).
With the props we have received from the App.js we construct the url we will be sending our request to. It should have a format like this: 
`https://opentdb.com/api.php?amount=10&category=12&difficulty=hard&type=multiple`
We receive an array of questions objects from the API. We create our own array questionsArr.
The original questions contain  one correct answer as string and an array of false answers. With both these arguments we run the function shuffleAnswers(correctAnswerText, incorrectAnswersTexts). 
From correctAnswerText parameter we crate an object with these properties:

```
correctAnswer = {
            id: nanoid(),
            text: decode(correctAnswerText),        // decode removes html entities chars
            isSelected: false,
            isCorrect: true,
        }
```

**For each** of the incorrect ones we create an object like this:
```
let answerObj = {
            id: nanoid(),
            text: decode(a),
            isSelected: false,
            isCorrect: false,
            }
```
All the answers are then added to an array which is shuffled **in place**. Now we can identify the correct answer by its isCorrect property while at the same time it will be just in random position amongst the incorrect ones.
Our array questionsArr can now be filled with objects containing the text of the original question, the answers array we just created and other properties we are going to be using later on. These objects (10 in our case after each successful request) will look like this:

```
         {
            id: nanoid(),
            text: decode(q.question),
            answersArr: answersArr,
            isAnswered: false,
            answeredCorrectly: false,
         }
```
The we sett the state questions with the newly created array with: 
`        setQuestions(questionsArr)`

Now since the state of hasSubmitted is false we render a Question component for each of our questions:
            
```
const questionElements = questions.map(q =>
                <Question
                    question={q}
                    key={q.id}
                    selectAnswer={selectAnswer} />) // will get back question and answer IDs
```

The function  selectAnswer will receive the questionID, answerID from the component, will modify the state of questions by changing the question with the selected id in 2 ways: 
1. isAnswered becomes true, 
2. the clicked answer's isSelected property is toggled and is overwritten with its new value in the question's answersArr.
This function will obviously be triggered from the relevant Question component with the unique questionID and answerID.

```
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
    
```


### Question.js
This component will return a rendered question which will itself contain a div with all the answers from props.question.answersArr as separate span elements. Once clicked the relevant answer will have its isSelected property modified to true, while all the others will be overwritten with false (to avoid duplicate selections). 
```
onClick={() => {
                                for (let a of answers) {
                                    a.isSelected = false
                                }
                                answer.isSelected = true

                                return props.selectAnswer(props.question.id, answer.id)
                            }
                            }

```
We also apply the relevant CSS class depending on isSelected.


 



	

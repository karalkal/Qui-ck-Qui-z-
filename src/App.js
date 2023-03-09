import React from "react";
import Welcome from "./Welcome";
import Quizz from "./Quizz";

// Toggle screen selection between Welcome and App,
function App() {
  const [startScreen, setStartScreen] = React.useState(true)
  const [quizInstance, setQuizInstance] = React.useState({})

  function toggleScreen(category, difficulty, quizType) {
    setStartScreen(prevScreen => !prevScreen)
      setQuizInstance(
        {
          category,
          difficulty,
          quizType
        }
      )    

  }

  return (
    <div>
      {startScreen
        ? <Welcome handleClick={toggleScreen} />
        : <Quizz handleClick={toggleScreen} quizInstance={quizInstance} />}
    </div>
  );
}


export default App;

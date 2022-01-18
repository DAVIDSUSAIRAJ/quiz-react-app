import { useState } from "react";
import Quiz from "./components/quiz";
import "./App.scss";

function App() {
  const [start, setStart] = useState(false);
  const quizStart = () => {
    setStart(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {start ? (
          <Quiz />
        ) : (
          <div className="quiz-start">
            <div className="about-quiz">
              <div className="about-quiz-header">
                <h4>SOME RULES OF THESE QUIZ</h4>
              </div>
              <div className="about-quiz-body">
                <p>1. A total of 5 questions will be asked.</p>
                <p>2. Each question will be given 1 mark.</p>
                <p>3. Each question will be given only 20 seconds</p>
              </div>
            </div>
            <div className="quiz-start-btn">
              <button onClick={quizStart}>QUIZ START</button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

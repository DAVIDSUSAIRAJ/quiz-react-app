import { useState, useEffect } from "react";
import questionAnswers from "./questionAnswer";
import "../scss/quiz.scss";
import quizLogo from "../images/Quiz-star.png";
import championCup from "../images/winnercup.jpg";
function Quiz(params) {
  const questionAnswer = [...questionAnswers];

  const [questionIndex, setQuestionIndex] = useState(0);
  const currentquestion = questionAnswer[questionIndex];
  const [questioncount, setQuestioncount] = useState(1);
  const [timer, setTimer] = useState(20);
  const [score, setScore] = useState(0);
  const [showmarks, setShowmarks] = useState(false);

  const nextquestion = (index) => {
    // START SCORE
    if (index === currentquestion.answer) {
      setScore(score + 1);
    }
    // END START SCORE
    // START NEXT QUESTION AND SHOWMARKS
    if (questionIndex + 1 < questionAnswer.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setShowmarks(true);
    }
    // END NEXT QUESTION AND SHOWMARKS

    // setCount(count + 1);
    // OR OTHER METHOD
    if (questioncount + 1 <= questionAnswer.length) {
      setQuestioncount(questioncount + 1);
    }
    setTimer(20);
  };

  return (
    <div>
      {/* quiz-app */}

      <div className="quiz-container">
        <div className="quiz-container--app">
          {/* START QUIZ RESULT */}
          {showmarks ? (
            <div className="quiz-result">
              <div className="result--card">
                <div className="champion-cup">
                  <img src={championCup}></img>
                </div>
                <div className="score-announce">
                  <h4>Congrats!</h4>
                  <h2>90% Score</h2>
                  <div className="progress">
                    <div className="progressbar">
                      <div className="progress-dynamic"></div>
                    </div>
                    <div className="progress-percentage">
                      {" "}
                      <span> 90</span>%{" "}
                    </div>
                  </div>
                  <h6>Medium level</h6>
                  <p>Quiz completed successfully.</p>
                </div>
                <div className=" score-announce--detail">
                  <p>
                    You attempt <span className="attend-qs">5 questions</span>{" "}
                    and from that <span className="attend-ans">5 answer </span>
                    is correct.
                  </p>
                </div>
                <div className="restart">
                  <button className="restart-btn">
                    <span className="restart-btn-text">Restart..</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="quiz-test">
              <div className="quiz-test--card">
                <div className="quiz-test--card--header">
                  <div className="quiz-count">
                    <p>
                      Quiz: {questioncount}/{questionAnswer.length}
                    </p>
                  </div>
                  <div className="quiz-logo">
                    <img
                      src={quizLogo}
                      alt="quiz-logo"
                      className="quiz-logo--img"
                    ></img>
                  </div>
                  <div className="quiz-time">
                    <p>00:{timer}</p>
                  </div>
                </div>
                <div className="quiz-test--card--body">
                  <div className="quiz-question">
                    <p className="question">
                      {" "}
                      {questioncount}. {currentquestion.question}
                    </p>
                  </div>
                  <div className="quiz-options">
                    <ul className="quiz-options--ul">
                      {currentquestion.options.map((option, index) => (
                        <li
                          className="quiz-options--ul__li"
                          key={index}
                          onClick={() => nextquestion(index)}
                        >
                          {index == 0 && (
                            <span className="ans-list--a">
                              {" "}
                              <span> {index == 0 && "a "}</span>
                            </span>
                          )}

                          {index == 1 && (
                            <span className="ans-list--b">
                              {" "}
                              <span> {index == 1 && "b "}</span>
                            </span>
                          )}
                          {index == 2 && (
                            <span className="ans-list--c">
                              {" "}
                              <span> {index == 2 && "c "}</span>
                            </span>
                          )}
                          {index == 3 && (
                            <span className="ans-list--d">
                              {" "}
                              <span> {index == 3 && "d "}</span>
                            </span>
                          )}
                          <span className="options"> {option}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* END QUIZ TEST */}
        </div>
      </div>

      {/* end quiz-app */}
    </div>
  );
}
export default Quiz;

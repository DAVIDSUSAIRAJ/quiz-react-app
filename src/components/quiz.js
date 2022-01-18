import { useState, useEffect, useRef } from "react";
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
  const [addzero, setAddzero] = useState(false);
  const progress = useRef();
  const level = useRef();
  const quizTime = useRef();
  const progre = `${(score / questionAnswer.length) * 100}`;
  // NEXT QUESTION WHILE ONCLICK WITH CONDITONS CHECK
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
    setAddzero(false);
  };
  // END NEXT QUESTION ONCLICK WITH CONDITONS CHECK
  // START RESTART BEHAVIOUR
  const restart = () => {
    setShowmarks(false);
    setQuestionIndex(0);
    setScore(0);
    setQuestioncount(1);
    setTimer(20);
    setAddzero(false);
  };
  // END RESTART BEHAVIOUR
  //AUTOMATIC USEEFFECT CALLED IN DYNAMIC COUNTER(TIME)
  useEffect(() => {
    if (showmarks == false) {
      const interval = setInterval(() => {
        setTimer((time) => time - 1);
      }, 1000);

      if (timer == 0) {
        nextquestion();
        setAddzero(false);
      }
      if (timer == 9) {
        setAddzero(true);
      }
      if (timer <= 5) {
        quizTime.current.style.color = "rgb(246, 57, 57)";
      } else if (timer <= 10) {
        quizTime.current.style.color = "#f5b600";
      } else if (timer <= 20) {
        quizTime.current.style.color = "#1dbf73";
      }
      return () => clearInterval(interval);
    } else if (showmarks == true) {
      console.log("true");
      console.log(progre);
      if (progre > 60) {
        progress.current.style.width = `${progre}%`;
        console.log(progre);
        progress.current.style.backgroundColor = "#1dbf73";
        level.current.innerHTML = "High level..";
        level.current.style.color = "#1dbf73";
      } else if (progre > 20) {
        progress.current.style.width = `${progre}%`;

        progress.current.style.backgroundColor = "#d88419";
        level.current.innerHTML = "Medium level..";
        level.current.style.color = "#d88419";
      } else if (progre <= 20) {
        progress.current.style.width = `${progre}%`;

        progress.current.style.backgroundColor = "rgb(246, 57, 57)";
        level.current.innerHTML = "low level..";
        level.current.style.color = "rgb(246, 57, 57)";
      }
    }
  });
  // END AUTOMATIC USEEFFECT CALLED IN DYNAMIC COUTER(TIME)
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
                  <h2>{progre}% Score</h2>
                  <div className="progress">
                    <div className="progressbar">
                      <div className="progress-dynamic" ref={progress}></div>
                    </div>
                    <div className="progress-percentage">
                      {" "}
                      <span className="progre">{progre}%</span>
                    </div>
                  </div>
                  <h6 ref={level}>Low level</h6>
                  <p>Quiz completed successfully.</p>
                </div>
                <div className=" score-announce--detail">
                  <p>
                    You attempt{" "}
                    <span className="attend-qs">
                      {questionAnswer.length} questions
                    </span>{" "}
                    and from that{" "}
                    <span className="attend-ans">{score} answer </span>
                    is correct.
                  </p>
                </div>
                <div className="restart">
                  <button className="restart-btn" onClick={restart}>
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
                      Quiz: <span className="qstin-count">{questioncount}</span>
                      /{questionAnswer.length}
                    </p>
                  </div>
                  <div className="quiz-logo">
                    <img
                      src={quizLogo}
                      alt="quiz-logo"
                      className="quiz-logo--img"
                    ></img>
                  </div>
                  <div className="quiz-time" ref={quizTime}>
                    <p className="countzero">
                      <span> 00:</span>
                    </p>
                    <p className="counttime">
                      {addzero && "0"}
                      {timer}
                    </p>
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

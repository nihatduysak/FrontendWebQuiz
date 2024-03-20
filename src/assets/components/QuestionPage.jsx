import Header from "./Header"
import { useState } from 'react';
import FinishQuiz from "./FinishQuiz";

export default function QuestionPage({ setDarkMode, currentQuiz, setCurrentQuiz, currentQuestion, setCurrentQuestion}) {

    const [userAnswer, setUserAnswer] = useState(null);
    const [score, setScore] = useState(localStorage.getItem('score') ? JSON.parse(localStorage.getItem('score')) : 0);
    const [submitted, setSubmitted] = useState(false);
    const [isSelectAnswer, setIsSelectAnswer] = useState(true);
    
    const handleAnswer = (answer) => {
        if (!submitted) {
            setUserAnswer(answer);
        }
    };

    function handleAnswerSelected(e) {
        if (!submitted) {
            const allAnswers = document.querySelectorAll('.answer');
            allAnswers.forEach((answer) => answer.classList.remove('selected'));

            const selectedAnswer = e.currentTarget;
            selectedAnswer.classList.add('selected');
        }
    }

    const handleSubmit = () => {
        if(userAnswer === null) return(setIsSelectAnswer(false));

        setSubmitted(true);

        const correctAnswer = currentQuiz.questions[currentQuestion].answer;
        const allAnswers = document.querySelectorAll('.answer');

        allAnswers.forEach((answer) => {
            const pText = answer.querySelector('p').innerText;
            if (pText === correctAnswer) {
                answer.classList.add('correct-answer');
            } else if (pText === userAnswer) {
                answer.classList.add('wrong-answer');
            }
            console.log(pText);
        })

        if (userAnswer === currentQuiz.questions[currentQuestion].answer) {
            setScore(score + 1);
            localStorage.setItem('score', JSON.stringify(score + 1));
        }
        setIsSelectAnswer(true);
        setSubmitted(true);
    };

    const nextQuestion = () => {
        document.querySelectorAll('.answer').forEach((answer) => {
            answer.classList.remove('correct-answer');
            answer.classList.remove('wrong-answer');
        })

        if (currentQuestion < currentQuiz.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion + 1));
            const allAnswers = document.querySelectorAll('.answer');
            allAnswers.forEach((answer) => answer.classList.remove('selected'));
        }
        setUserAnswer(null);
        setSubmitted(false);
    };

    return (
        <>

            {
                currentQuestion <= 9 ?
                    (
                        <>
                            <div className="container">
                                <div className="questionHeader">
                                    <div className="questionTitle">
                                        <img src={currentQuiz.icon} alt="Accessibility Icon" />
                                        <p>{currentQuiz.title}</p>
                                    </div>
                                    <div className="div">
                                        <Header setDarkMode={setDarkMode} />
                                    </div>
                                </div>
                                <div className="questionSection">
                                    <div className="questions">
                                        <div className="questionsText">
                                            <p>Question {currentQuestion + 1} of 10</p>
                                            <h2>{currentQuiz.questions[currentQuestion].question}</h2>
                                        </div>
                                        <div className="progressbarContainer">
                                            <div className="progressbar" style={{width: `${(currentQuestion + 1) / (currentQuiz.questions.length - 1) * 100}%`}}>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="answers">

                                        {currentQuiz.questions[currentQuestion].options.map((answer, index) => (
                                            <div key={index} className="answer" onClick={handleAnswerSelected}>

                                                <button onClick={() => handleAnswer(answer)}>
                                                    {index === 0 && <h2>A</h2> || index === 1 && <h2>B</h2> || index === 2 && <h2>C</h2> || index === 3 && <h2>D</h2>}
                                                    {' '}
                                                    <p>{answer}</p>
                                                </button>

                                            </div>
                                        ))}
                                        {!submitted ?
                                            (<button onClick={handleSubmit} className="submitAnswer"><p className="answerBtn">Submit Answer</p></button>)
                                            :
                                            (<button onClick={nextQuestion} className="submitAnswer"><p className="answerBtn">Next Question</p></button>)
                                        }
                                        {
                                            !isSelectAnswer && <p className="errorText">Please select an answer</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    :
                    (
                        <FinishQuiz setDarkMode={setDarkMode} setCurrentQuestion={setCurrentQuestion} setCurrentQuiz={setCurrentQuiz} currentQuiz={currentQuiz} score={score} />
                    )

            }

        </>
    )
}







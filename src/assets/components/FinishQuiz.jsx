import Header from "./Header"

export default function FinishQuiz({setDarkMode, score, currentQuiz, setCurrentQuiz, setCurrentQuestion }) {

    function handlePlayAgain() {
        localStorage.setItem('currentQuiz', JSON.stringify([]));
        localStorage.setItem('currentQuestion', JSON.stringify(0));
        localStorage.setItem('score', JSON.stringify(0));
        setCurrentQuiz([]);
        setCurrentQuestion(0);
    }



    return (
        <>

            <div className="container">
                <div className="questionHeader">
                    <div className="questionTitle">
                        <img src={currentQuiz.icon} alt={currentQuiz.title} />
                        <p>{currentQuiz.title}</p>
                    </div>
                    <div className="div">
                        <Header setDarkMode={setDarkMode} />
                    </div>
                </div>
                <div className="finishQuizContainer">
                    <div className="quizComplete">
                        <h2 className="quizStatus">Quiz completed</h2>
                        <h2 className="scoreText"><b>You scored...</b></h2>
                    </div>
                    <div className="scoreBoard">
                        <div className="quizScore">
                            <div className="access">
                                <img src={currentQuiz.icon} alt={currentQuiz.title} />
                                <p className="topic">{currentQuiz.title}</p>
                            </div>
                            <span>{score}</span>
                            <p>out of 10</p>
                        </div>
                        <div className="playAgainBtn">
                            <button onClick={handlePlayAgain}><p>Play Again</p></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
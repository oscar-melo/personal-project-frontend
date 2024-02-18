import Answer from "./Answer";
import { useContext} from "react";
import { QuizContext } from "../context/quiz";

//is possible use function but is better use arrow function because is more simple and modern
const Question = () => {
    const [quizState, dispatch] = useContext(QuizContext)
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    //all components must return a markup
    return (
        <div>
        <div className="question">{currentQuestion.question}</div>
            <div className="answers">
                {quizState.answers.map((answer, index) => (
                    <Answer
                        answerText={answer}
                        key={index}
                        index={index}
                        currentAnswer={quizState.currentAnswer}
                        correctAnswer={currentQuestion.correctAnswer}
                        onSelectAnswer={(answerText) => dispatch({type: "SELECT_ANSWER", payload: answerText})} />
                ))}
            </div>
        </div>
    );
};

export default Question;

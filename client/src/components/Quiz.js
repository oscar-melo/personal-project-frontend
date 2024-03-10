import { useContext, useEffect} from "react";
import Question from "./Question";
import { QuizContext } from "../context/quiz";

//https://opentdb.com/api_config.php

/*
 * Next is replaced by React context


// initialize the state of the component
const initialState = {
    currentQuestionIndex: 0,
    questions: [],
};

//define the reducer function, how actions should be mapped to state changes

const reducer = (state, action) => {
    if (action.type === "NEXT_QUESTION") {
        return {...state, currentQuestionIndex: state.currentQuestionIndex + 1}
    }
    return state
};

*/

//is possible use function but is better use arrow function because is more simple and modern
const Quiz = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    //if fail regenerate link at: https://opentdb.com/api_config.php
    const apiURL = "https://opentdb.com/api.php?amount=10&category=10&difficulty=easy";

    useEffect(() => {
        if (quizState.questions.length > 0)
        {
            return;
        }
        console.log("inicializando ");
        fetch(apiURL).then((response) => response.json()).then(data => {
            console.log(data);
            dispatch({type: "LOAD_QUESTIONS", payload: data.results});
        });
    } );

// useReducer returns a stateful value, and a function to update it.

/**
  * Replaced by React context
    const [state, dispatch] = useReducer(reducer, initialState);

*/
/*
    this is actually a correct way to use useState, but is better to use a reducer because is more scalable and readable.
        const[currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
        const testClick = () => {
            console.log("test click");
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        .
        .
        .
        <div className="next-button" onClick={testClick}>Next Question {currentQuestionIndex}</div>
*/

    //all components must return a markup
    return (
        <div className="quiz">
            {quizState.showResults && (
                <div className="results">
                    <div className="congratulations">Congratulations</div>
                    <div className="results-info">
                        <div>You have completed de quiz</div>
                        <div>You've got {quizState.correctAnswersCount} of {quizState.questions.length}</div>
                    </div>
                    <div className="next-button" onClick={() => dispatch({type: 'RESTART'})}>Restart</div>
                </div>
            )}
            {!quizState.showResults && quizState.questions.length > 0  && ( <div>
                <div className="score">Question {quizState.currentQuestionIndex + 1 }/{quizState.questions.length}</div>
                <Question/>
                <div className="next-button" onClick={() => dispatch({type: 'NEXT_QUESTION'})}>Next Question</div>
            </div>
            )}
        </div>
    )
};

export default Quiz;

import { createContext, useReducer } from "react";
import questions from "../data";
import { shuffleAnswers } from "../helpers";

export const QuizContext  = createContext();


// initialize the state of the component
const initialState = {
    currentQuestionIndex: 0,
    /*
    larger way
    questions: questions,
    */
    questions,
    showResults: false,
    answers: shuffleAnswers(questions[0]),
    currentAnswer: '',
    correctAnswersCount: 0,
};

//define the reducer function, how actions should be mapped to state changes

const reducer = (state, action) => {
    switch (action.type) {
        case "SELECT_ANSWER": {
            const correctAnswersCount = action.payload === state.questions[state.currentQuestionIndex].correctAnswer ? state.correctAnswersCount + 1 : state.correctAnswersCount;
            return {
                ...state,
                currentAnswer: action.payload,
                correctAnswersCount,
            }
        }
        case "NEXT_QUESTION": {
            const showResults = state.currentQuestionIndex === state.questions.length - 1;
            const currentQuestionIndex = showResults ? state.currentQuestionIndex : state.currentQuestionIndex + 1;
            const answers = showResults? []: shuffleAnswers(state.questions[currentQuestionIndex]);
            return {
                ...state,
                currentQuestionIndex,
                showResults,
                answers,
                currentAnswer: ''
            }
        }
        case "RESTART": {
            /**  Modo novato
            const showResults = false;
            const currentQuestionIndex = 0;
            return {
                ...state,
                currentQuestionIndex,
                showResults,
            }
            */
            return initialState;
        }
        default: {
            return state;
        }

    }
};


export const QuizProvider = ({children}) => {
    const value = useReducer(reducer, initialState);
return (
        <QuizContext.Provider value={value} >
            {children}
        </QuizContext.Provider>

    )
};

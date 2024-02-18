
//is possible use function but is better use arrow function because is more simple and modern
const Answer = ({answerText, onSelectAnswer, index, currentAnswer, correctAnswer}) => {
    const letterMapping = ['A', 'B', 'C', 'D']
    const isCorrectAnswer = currentAnswer && answerText === correctAnswer;
    const isWrongAnswer = currentAnswer === answerText && answerText !== correctAnswer;
    const correctAnswerClass = isCorrectAnswer ? "correct-answer" : "";
    const wrongAnswerClass = isWrongAnswer ? "wrong-answer" : "";
    const disabledClass = currentAnswer ? "disabled-answer" : "";
    //all components must return a markup
    return (
    <div className={`answer ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`} onClick={() => onSelectAnswer(answerText)}>
        <div className="answer-letter">{letterMapping[index]}</div>
        <div className="answer-text">{answerText}</div>
    </div>

    );
};

export default Answer;

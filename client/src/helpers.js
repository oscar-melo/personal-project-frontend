export const shuffleAnswers = (questions) => {
    const unshuffledAnswers = [
        questions.correctAnswer,
        ...questions.incorrectAnswers,
    ];
    return unshuffledAnswers
        .map((unshuffledAnswer) => ({
            sort: Math.random(),
            value: unshuffledAnswer
        }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
}

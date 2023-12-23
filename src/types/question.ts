export type Question = {
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correct_answer: string | boolean,
    incorrect_answers: [
        string | boolean,
        string | boolean,
        string | boolean
    ]
}
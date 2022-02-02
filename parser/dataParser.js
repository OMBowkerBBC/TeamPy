import * as fs from 'fs';
import fetch from 'node-fetch';

const returnAnswersData = (questionObject) => {

};

const data = fs.readFileSync("./routes.txt", 'utf-8').split('\n');
const keyValuePairs = data.map((item) => ({
    key: item.split(":-:")[0],
    value: item.split(":-:")[1]
}));

keyValuePairs.forEach((item) => {
    fetch(item.value)
    .then((res) => res.json())
    .then((json) => {
        const rawData = json.results;

        const writeData = rawData.map((question) => {
            let shuffledItems = [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5);
            const shuffles = Math.ceil(Math.random()*3);
            console.log(`Shuffling ${shuffles} times for ${item.key}`)
            for (let i = 0; i < shuffles; i++) {
                shuffledItems = shuffledItems.sort(() => Math.random() - 0.5)
            }

            const correctIndex = shuffledItems.indexOf(question.correct_answer);
            return {
                "question": question.question,
                "answers": shuffledItems,
                "correct_answer": correctIndex + 1,
            };
        });

        fs.writeFileSync(`../static/quiz folder/${item.key}.json`, JSON.stringify(writeData, null, 4))
    });
});

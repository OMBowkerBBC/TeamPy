let score = 0;
let test;

const checkAnswer = (target) => {
    const parent = target.parentElement;
    const parentParent = parent.parentElement;
    const answer = parent.getElementsByTagName("select")[0].value;
    const correctAnswer = target.getAttribute("data-answer");
    target.disabled = true;

    if (answer == correctAnswer) {
      parentParent.style.backgroundColor = "#07a82f";
      score += 1;
    } else parentParent.style.backgroundColor = "#f74919";

    const answers = parentParent.getElementsByTagName("li");
    const answersParent = answers[0].parentElement;
    const newData = answers[Object.keys(answers).filter((item) => parseInt(item) + 1 == correctAnswer)[0]]

    var child = answersParent.lastElementChild; 
    while (child) {
        answersParent.removeChild(child);
        child = answersParent.lastElementChild;
    }    

    answersParent.appendChild(newData);
}

const finishQuiz = () => {
  let data = {};
  const localStorageData = localStorage.getItem("userObject");
  if (localStorageData !== null) data = JSON.parse(localStorageData);
  data = { ...data, score: score };
  localStorage.setItem("userObject", JSON.stringify(data));
  window.location.href = `${window.location.href.split("/")[0]}/quizEnd`;
}

window.onload = () => {
  const answerButtons = document.querySelectorAll(".submit-answer-button");
  answerButtons.forEach((item) => item.addEventListener("click", () => checkAnswer(item)));

  const finishQuizButton = document.getElementById("finish-quiz-button");
  test = finishQuizButton;
  finishQuizButton.addEventListener("click", () => finishQuiz())
}; 
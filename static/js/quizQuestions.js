const checkAnswer = (target) => {
    const parent = target.parentElement;
    const answer = parent.getElementsByTagName("select")[0].value;
    const correctAnswer = target.getAttribute("data-answer");
    answer == correctAnswer && alert("Correct");
}

window.onload = () => {
  const userSettings = localStorage.getItem("userObject");
  console.log(JSON.parse(userSettings).name);
};
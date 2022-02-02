const checkAnswer = (target) => {
    const parent = target.parentElement;
    const answer = parent.getElementsByTagName("select")[0].value;
    const correctAnswer = target.getAttribute("data-answer");
    answer == correctAnswer && alert("Correct");
}

window.onload = () => {
  const userSettings = JSON.parse(localStorage.getItem("userObject"));
  if (userSettings.difficulty == "Expert" && !window.location.href.includes("Expert")) window.location.href = `${window.location.href}?dif=Expert`
}; 
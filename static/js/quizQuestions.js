const checkAnswer = (target) => {
    const parent = target.parentElement;
    const answer = parent.getElementsByTagName("select")[0].value;
    const correctAnswer = target.getAttribute("data-answer");
    answer == correctAnswer && alert("Correct");
  }
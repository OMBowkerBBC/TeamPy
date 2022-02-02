const checkAnswer = (target) => {
    const parent = target.parentElement;
    const sibling = parent.getElementsByTagName("p")[1];
    const answer = sibling.getElementsByTagName("select")[0].value;
    const correctAnswer = target.getAttribute("data-answer");
    answer == correctAnswer && alert("Correct");
  }
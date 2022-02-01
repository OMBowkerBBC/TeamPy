let table, submitScoreButton, spinner;

const saveScoreToServer = () => {
    setTimeout(() => {
        spinner.style.opacity =  0;
        setTimeout(() => table.style.opacity = 1, 300);
    }, 3000);

    spinner.style.opacity = 1;
    submitScoreButton.style.opacity = 0;
    submitScoreButton.style.cursor = "auto";
    submitScoreButton.disabled = true;
};

window.onload = () => {
    table = document.querySelector(".custom-table");
    submitScoreButton = document.querySelector("button");
    spinner = document.querySelector(".spinner");

    submitScoreButton.addEventListener("click", () => saveScoreToServer());
}
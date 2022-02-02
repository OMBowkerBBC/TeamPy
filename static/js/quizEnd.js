let table, submitScoreButton, spinner;

const saveScoreToServer = () => {
    setTimeout(() => {
        spinner.style.opacity =  0;
        setTimeout(() => table.style.opacity = 1, 300);
    }, 3000);

    spinner.style.opacity = 1;
    submitScoreButton.innerText = "Back to Home";
    submitScoreButton.removeEventListener("click", saveScoreToServer);
    submitScoreButton.addEventListener("click", () => window.location.href = `${window.location.href.split("/")[0]}/`);
};

const getUsersData = () => {
    const localStorageData = localStorage.getItem("userObject");
    let parsedData, name;
    let score = "Something went Wrong!";

    if (localStorageData !== null) {
        parsedData = JSON.parse(localStorageData);
        name = parsedData.name === undefined ? "" : parsedData.name;
        score = parsedData.score;
    }
    
    const congratsMessage = document.querySelector(".greeting-wrapper").querySelector("h1");
    congratsMessage.innerText = `Congratulations ${name}`

    const scoreMessage = document.querySelector(".greeting-wrapper").querySelector("h3");
    scoreMessage.innerText = `You got ${score} out of 4!`;
};

window.onload = () => {
    table = document.querySelector(".custom-table");
    submitScoreButton = document.querySelector("button");
    spinner = document.querySelector(".spinner");

    submitScoreButton.addEventListener("click", saveScoreToServer);

    getUsersData();
}
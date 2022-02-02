let table, submitScoreButton, spinner;

const saveScoreToServer = () => {
    setTimeout(() => {
        spinner.style.opacity =  0;
        setTimeout(() => table.style.opacity = 1, 300);
    }, 3000);

    spinner.style.opacity = 1;
    submitScoreButton.innerText = "Back to Home";
    submitScoreButton.removeEventListener("click", saveScoreToServer);
    submitScoreButton.addEventListener("click", () => window.location.href = `${window.location.href.split("/")[0]}/quizStartV2`);
};

const getUsersName = () => {
    const localStorageData = localStorage.getItem("userObject");
    let name = "Name Pending...";
    if (localStorageData !== null) name = JSON.parse(localStorageData).name;
    document.querySelector(".greeting-wrapper").querySelector("h1").innerText = `Congratulations ${name}`;
};

window.onload = () => {
    table = document.querySelector(".custom-table");
    submitScoreButton = document.querySelector("button");
    spinner = document.querySelector(".spinner");

    submitScoreButton.addEventListener("click", saveScoreToServer);

    getUsersName();
}
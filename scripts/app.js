const homeBox = document.querySelector(".home-box");
const resultBox = document.querySelector(".result-box");
const resultContainer = document.querySelector(".result-container");
const input = document.querySelector("#input");
const submitBtn = document.querySelector("#submit-btn");
const error = document.querySelector(".error");
const loading = document.querySelector(".loading");

resultContainer.style.display = "none";
error.style.display = "none";

displayData(homeBox, "position");

const handleClick = async () => {
  const value = input.value;
  if (!value) {
    resultContainer.style.display = "none";
    return (error.style.display = "initial");
  }
  error.style.display = "none";
  await displayData(resultBox, "text", value);
  resultContainer.style.display = "initial";
};

submitBtn.addEventListener("click", handleClick);

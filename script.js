const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const btnStart = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
let phrases = [
  "Learning JavaScript",
  "Front End Developer",
  "Learning is fun",
  "I like cheese",
  "It is cold today",
  "It is hot tomorrow",
];
let missed = 0;

//Return random phrase from an array
const getRandomPhraseAsArray = (arr) =>
  arr[Math.floor(Math.random() * phrases.length)];

const randomPhrase = getRandomPhraseAsArray(phrases);

//Adds the letters of a string to the display
const addPhraseToDisplay = (arr) => {
  const phraseDiv = document.getElementById("phrase");
  for (let i = 0; i < phrases.length; i++) {
    const currentPhrase = arr[i];
    const li = document.createElement("li");
    const phraseClassName = trimAndLower(currentPhrase);

    li.innerHTML = currentPhrase;
    li.classList.add("hide");
    li.classList.add(phraseClassName);
    phraseDiv.appendChild(li);
  }
};

// Check if a letter is in the phrase
const checkLetter = (e) => {
  const letterClicked = e.target.value;
  let matchLetter = null;

  if (randomPhrase.indexOf(letterClicked) > -1) {
    const targetClassName = trimAndLower(randomPhrase);
    const targetLi = document.getElementsByClassName(targetClassName)[0];
    targetLi.classList.add("show");
    targetLi.classList.remove("hide");
    matchLetter = true;
  }

  return matchLetter;
};

const trimAndLower = (val) => {
  return val.replace(" ", "").toLowerCase();
};

// Check if the game has been won or lost
// const checkWin = () => {};

// Listen for the start game button to be pressed
btnStart.addEventListener("click", () => {
  overlay.style.display = "none";
  const newPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(newPhrase);
});

// Listen for the onscreen keyboard to be clicked
qwerty.addEventListener("click", (e) => {
  if (e.target.tagName === "button") {
    const button = e.target;
    button.className = "chosen";
    button.disabled = "true";
  }
});

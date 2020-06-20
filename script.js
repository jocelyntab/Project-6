const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const btnStart = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
const ulPhrase = document.querySelector("#phrase");
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
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");
    li.textContent = arr[i];
    ulPhrase.appendChild(li);
    if (arr[i] != " ") {
      li.className = "letter";
    } else {
      li.className = "space";
    }
  }
};

// Check if a letter is in the phrase
const checkLetter = (letterClicked) => {
  const letter = document.querySelector(".letter");
  let matchLetter = null;

  for (let i = 0; i < letter.length; i++) {
    if (letterClicked == letter[i].textContent) {
      letter[i].className.add = "letter show";
      matchLetter = letter[i].textContent;
    }
  }
  return matchLetter;
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
    const buttonClick = e.target;
    buttonClick.className = "chosen";
    buttonClick.disabled = "true";
    const letterFound = checkLetter(buttonClick.textContent);
  }
});

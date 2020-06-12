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
let missed = [0];

btnStart.addEventListener("click", () => {
  overlay.style.display = "none";
});

//Return random phrase from an array
const getRandomPhraseAsArray = (arr) => {
  let randomPhrase = arr[Math.floor(Math.random() * phrases.length)];
  const phraseAsArray = Array.from(phrase);
  return arr[randomPhrase];
};
getRandomPhraseAsArray(phrase);

//Adds the letters of a string to the display
const addPhraseToDisplay = (arr) => {
  const phraseDiv = document.getElementById("phrase");
  for (let i = 0; i < phrases.length; i++) {
    const currentPhrase = arr[i];
    const li = document.createElement("li");
    li.innerHTML = currentPhrase;
    phraseDiv.appendChild(li);
  }
};

// Check if a letter is in the phrase
const checkLetter = (button) => {};

// Check if the game has been won or lost
// const checkWin = () => {};

// Listem for the start game button to be pressed
// startButton.addEventListener('click', () => {

// });

// Listen for the onscreen keyboard to be clicked
// qwerty.addEventListener('click', (e) = > {

// });

/*****************
 * DOM
 *****************/
const qwertyKeyboard = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const overlay = document.getElementById("overlay");
const ulPhrase = document.querySelector("#phrase");
const clonedTriesHTML = document.getElementsByTagName("ol")[0].innerHTML;
const tries = document.getElementsByClassName("tries");
const letters = document.getElementsByClassName("letter");
const overlayHeader = document.querySelector("#overlay h2");
const btnStart = document.querySelector(".btn__reset");

function _addDomLoseState() {
  overlay.classList.add("lose");
  overlay.style.display = "block";
  overlayHeader.innerHTML = "GAME OVER";
  btnStart.innerHTML = "Play Again";
}

function _addDomWinState() {
  overlay.classList.add("win");
  overlay.style.display = "block";
  btnStart.innerHTML = "Play Again";
  overlayHeader.innerHTML = "YOU WIN";
}

function addGameListeners() {
  btnStart.addEventListener("click", () => {
    overlay.style.display = "none";
    if (!initialRun) {
      resetGame();
    } else {
      initialRun = false;
    }

    // create new phrase when start button is clicked
    const newPhrase = getRandomPhrase(phrases);
    createPhraseDomNodes(Array.from(newPhrase));
  });

  qwerty.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const domLetter = e.target;
      const letterClicked = e.target.innerText;
      domLetter.classList.add("chosen");
      domLetter.disabled = "true";
      _checkLetter(letterClicked);
    }
  });
}

function createPhraseDomNodes(phraseArray) {
  for (let i = 0; i < phraseArray.length; i++) {
    const currPhraseLetter = phraseArray[i];
    const li = document.createElement("li");
    li.textContent = currPhraseLetter;
    ulPhrase.appendChild(li);
    if (currPhraseLetter != " ") {
      li.className = "letter";
    } else {
      li.className = "space";
    }
  }
}

function resetGameDomState() {
  const chosenLetterButtons = qwertyKeyboard.getElementsByTagName("button");
  const ol = document.getElementsByTagName("ol")[0];

  phrase.innerHTML = "";
  for (let i = 0; i < chosenLetterButtons.length; i++) {
    let currButton = chosenLetterButtons[i];
    currButton.className = "";
    currButton.disabled = false;
  }

  ol.innerHTML = "";
  ol.innerHTML = clonedTriesHTML;
}

/*****************
 * Phrases
 *****************/
const phrases = [
  "Learning JavaScript",
  "Front End Developer",
  "Learning is fun",
  "I like cheese",
  "It is cold today",
  "It is hot tomorrow",
];

function getRandomPhrase() {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

/*****************
 * Letters
 *****************/
function _areAllLettersChecked() {
  const lettersArray = Array.from(letters);
  const checkedLetters = lettersArray.filter((letter) =>
    letter.classList.contains("show")
  );
  return checkedLetters.length === letters.length;
}

function _highlightMatchingLetters(letterClicked) {
  let hasAtLeastOneMatchingLetter = false;
  const lettersArray = Array.from(letters);

  for (let i = 0; i < lettersArray.length; i++) {
    const currLetter = lettersArray[i];
    if (letterClicked.toLowerCase() === currLetter.innerText.toLowerCase()) {
      currLetter.classList.add("show");
      hasAtLeastOneMatchingLetter = true;
    }
  }

  return hasAtLeastOneMatchingLetter;
}

function _checkLetter(letterClicked) {
  const hasAtLeastOneMatchingLetter = _highlightMatchingLetters(letterClicked);

  //check if game won
  if (_areAllLettersChecked(letters)) {
    // switch to win state
    _addDomWinState();
  } else {
    //removing a heart if a letter does not match
    if (!hasAtLeastOneMatchingLetter) {
      if (tries && tries.length > 1) {
        tries[tries.length - 1].remove();
      } else {
        // switch to lose state
        _addDomLoseState();
      }
    }
  }

  return hasAtLeastOneMatchingLetter;
}

/*****************
 * Game Service
 *****************/

let initialRun = true;

function startGame() {
  // add game event listeners
  addGameListeners();

  if (initialRun) {
    resetGame();
  } else {
    initialRun = false;
  }
}

function resetGame() {
  resetGameDomState();
}

/*****************
 * Start game
 *****************/

startGame();

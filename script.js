(() => {
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

  const allAreLettersChecked = (letters) => {
    const checkedLetters = letters.filter((letter) =>
      letter.classList.contains("show")
    );
    return checkedLetters.length === letters.length;
  };

  // Check if a letter is in the phrase
  const checkLetter = (letterClicked) => {
    const letters = Array.from(document.getElementsByClassName("letter"));
    let matchedLetter = null;

    for (let i = 0; i < letters.length; i++) {
      if (letterClicked.toLowerCase() === letters[i].innerText.toLowerCase()) {
        letters[i].classList.add("show");
        matchedLetter = letters[i].textContent;
      }
    }

    //check if game won
    if (allAreLettersChecked(letters)) {
      overlay.classList.add("win");
      overlay.style.display = "block";
      document.querySelector("#overlay h2").innerHTML = "YOU WIN";
      btnStart.innerHTML = "Play Again";
    } else {
      //removing a heart if a letter does not match
      if (!matchedLetter) {
        const tries = document.getElementsByClassName("tries");
        if (tries && tries.length > 1) {
          tries[tries.length - 1].remove();
          // ending the game if there are no more hearts
        } else {
          overlay.classList.add("lose");
          overlay.style.display = "block";
          document.querySelector("#overlay h2").innerHTML = "GAME OVER";
          btnStart.innerHTML = "Play Again";
        }
      }
    }

    return matchedLetter;
  };

  // Reset the Game
  const resetGame = (letterClicked) => {
    const letters = Array.from(document.getElementsByClassName("letter"));

    for (let i = 0; i < letters.length; i++) {
      letters[i].classList.remove("show");
    }
  };

  // Listen for the start game button to be pressed
  btnStart.addEventListener("click", () => {
    overlay.style.display = "none";
    resetGame();
    const newPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newPhrase);
  });

  // Listen for the onscreen keyboard to be clicked
  qwerty.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const domLetter = e.target;
      const letterClicked = e.target.innerText;
      domLetter.classList.add("chosen");
      domLetter.disabled = "true";
      const letterFound = checkLetter(letterClicked);
    }
  });
})();

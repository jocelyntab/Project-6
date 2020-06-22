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
  const overlayStyle =
    "position: fixed; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom; 0; z-index:9999; cursor: pointer; align-items: center;";
  const overlayTextStyle =
    "position:absolute; top: 0; left: 50%; font-size: 100px; color: #fff; -webkit-transform: translate(-50%, 50%); -moz-transform: translate(-50%, 50%); transform:(-50%, 50%);";

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

    if (allAreLettersChecked(letters)) {
      const winner = document.createElement("div");
      winner.style.cssText = overlayStyle;
      winner.style.backgroundColor = "#4BB543";

      // create overlay text
      const winnerText = document.createElement("span");
      winnerText.style.cssText = overlayTextStyle;
      winnerText.innerHTML = "YOU WIN BITCH";
      winner.appendChild(winnerText);
      scoreboard.appendChild(winner);
    } else {
      if (!matchedLetter) {
        const tries = document.getElementsByClassName("tries");
        if (tries && tries.length > 0) {
          tries[tries.length - 1].remove();
        } else {
          const gameOver = document.createElement("div");
          const scoreboard = document.getElementById("scoreboard");
          gameOver.classList.add("game-over-overlay");
          // create overlay div
          gameOver.style.cssText = overlayStyle;

          // create overlay text
          const gameOverText = document.createElement("span");
          gameOverText.innerHTML = "GAME OVER BITCH";
          gameOverText.style.cssText = overlayTextStyle;
          // add custom game over background colour
          gameOverText.style.backgroundColor = "#ff0033";
          gameOver.appendChild(gameOverText);
          scoreboard.appendChild(gameOver);
        }
      }
    }

    return matchedLetter;
  };

  // Listen for the start game button to be pressed
  btnStart.addEventListener("click", () => {
    overlay.style.display = "none";
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

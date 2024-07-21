document.getElementById("criteria-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const text = document.getElementById("text-chunk").value;
  const numberOfLetters = parseInt(
    document.getElementById("number-of-letters").value,
    10
  );
  const lettersInWord = document
    .getElementById("letters-in-word")
    .value.trim()
    .split(",")
    .map((letter) => {
      return letter.trim().toLowerCase();
    })
    .filter((letter) => {
      return letter !== "";
    });
  const lettersNotInWord = document
    .getElementById("letters-not-in-word")
    .value.trim()
    .split(",")
    .map((letter) => {
      return letter.trim().toLowerCase();
    })
    .filter((letter) => {
      return letter !== "";
    });
  const indicesOfLetters = document
    .getElementById("indices-of-letters")
    .value.trim()
    .split(",")
    .map((i) => {
      return i.trim();
    })
    .filter((i) => {
      return i !== "";
    });

  const regex = /\b\w+\b/g;
  const words =
    text.match(regex) ||
    [].map((word) => {
      return word.toLowerCase();
    });
  const uniqueWords = [...new Set(words)];

  const meetsFirstCriteria = uniqueWords.filter((word) => {
    return word.length === numberOfLetters;
  });

  const meetsSecondCriteria = meetsFirstCriteria.filter((word) => {
    const allRequiredLettersPresent = lettersInWord.every((letter) =>
      word.includes(letter)
    );
    if (allRequiredLettersPresent) {
      return word;
    }
  });

  const meetsThirdCriteria = meetsSecondCriteria.filter((word) => {
    const allForbidenLettersAbsent = !lettersNotInWord.some((letter) =>
      word.includes(letter)
    );
    if (allForbidenLettersAbsent) {
      return word;
    }
  });
  console.log(words);
  console.log(meetsFirstCriteria);
  console.log(lettersInWord);
  console.log(lettersNotInWord);
  console.log(indicesOfLetters);
  console.log(meetsSecondCriteria);
  console.log(meetsThirdCriteria);
  // document.getElementById("results").style.display = "flex";
  // document.getElementById("words").textContent = meetsThirdCriteria;
});

// console.loog(numberOfLetters);
// console.log(lettersInWord);
// console.log(lettersNotInWord);
// console.log(indicesOfLetters);

// const firstWord = "come";
// const letters = ["c", "m", "o", "e"];
// const allFound = letters.every((letter) => firstWord.includes(letter));
// console.log(allFound);

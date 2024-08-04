document.getElementById("criteria-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const text = document.getElementById("text-chunk").value.toLowerCase();
  const numberOfLetters = parseInt(
    document.getElementById("number-of-letters").value,
    10
  );
  const lettersInWord = document
    .getElementById("letters-in-word")
    .value.trim()
    .split(",")
    .map((letter) => letter.trim().toLowerCase())
    .filter((letter) => letter !== "");
  const lettersNotInWord = document
    .getElementById("letters-not-in-word")
    .value.trim()
    .split(",")
    .map((letter) => letter.trim().toLowerCase())
    .filter((letter) => letter !== "");
  const indicesOfLetters = document
    .getElementById("indices-of-letters")
    .value.trim()
    .split(",")
    .map((i) => i.trim())
    .filter((i) => i !== "");

  const regex = /\b\w+\b/g;
  const words = text.match(regex) || [];
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

  const meetsFourthCriteria = meetsThirdCriteria.filter((word) => {
    const matchAllIndices = indicesOfLetters.every((combination) => {
      const [letterIndex, letter] = combination
        .split(":")
        .map((index) => index.trim());
      return word[parseInt(letterIndex, 10)] === letter.toLowerCase();
    });
    if (matchAllIndices) return word;
  });
  document.getElementById("results").style.display = "block";
  if (meetsFourthCriteria.length === 0) {
    document.getElementById("results-intro").innerHTML =
      "<h3>No words in the given text matches your criteria</h3>";
    document.getElementById("words").textContent = "";
  } else {
    document.getElementById("results-intro").innerHTML =
      "<h3>These are the words matching your criteria: </h3>";
    document.getElementById("words").textContent = `${meetsFourthCriteria.join(
      ", "
    )}`;
  }
});

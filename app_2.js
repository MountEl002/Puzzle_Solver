const fileUrl = "words_alpha.txt";
let allEnglishWords = [];
let wordsLoaded = false;
const alphabet = "abcdefghijklmnopqrstuvwxyz";

loadWords();

document.getElementById("criteria-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const maxNumberOfLetters = parseInt(
    document.getElementById("max-number-of-letters").value,
    10
  );

  const minNumberOfLetters = parseInt(
    document.getElementById("min-number-of-letters").value,
    10
  );

  const lettersInWord = document
    .getElementById("letters-in-word")
    .value.trim()
    .toLowerCase();
  const lettersInWordArray = lettersInWord.split(",");
  // lettersOnly = extractLetters(lettersInWord, lettersOnly);

  const lettersNotInWord = alphabet
    .split("")
    .filter((letter) => !lettersInWord.includes(letter));

  const indicesOfLetters = document
    .getElementById("indices-of-letters")
    .value.trim()
    .split(",")
    .map((i) => i.trim())
    .filter((i) => i !== "");

  const meetsFirstCriteria = allEnglishWords.filter(
    (word) =>
      word.length <= maxNumberOfLetters && word.length >= minNumberOfLetters
  );

  const meetsSecondCriteria = meetsFirstCriteria.filter((word) => {
    const allForbidenLettersAbsent = !lettersNotInWord.some((letter) =>
      word.includes(letter)
    );
    if (allForbidenLettersAbsent) {
      return word;
    }
  });
  console.log(meetsSecondCriteria);

  const meetsThirdCriteria = meetsSecondCriteria.filter((element) => {
    return lettersInWordArray.every((combination) => {
      const [letter, numberOfTimes] = combination
        .split(":")
        .map((i) => i.trim());
      return countChars(element, letter) <= parseInt(numberOfTimes, 10);
    });
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
    document.getElementById("results-intro").textContent =
      "No words in the given text matches your criteria";
    document.getElementById("words").textContent = "";
  } else {
    document.getElementById("results-intro").textContent =
      "These are the words matching your criteria: ";
    document.getElementById("words").textContent = `${meetsFourthCriteria.join(
      ", "
    )}`;
  }
});

async function loadWords() {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }
    const contents = await response.text();
    allEnglishWords = contents.split(/\s+/).filter((word) => word.length > 0);
    wordsLoaded = true;

    if (wordsLoaded) {
      document.getElementById("site-overlay").classList.remove("site-overlay");
      document.getElementById("site-overlay").style.display = "none";
    }
  } catch (error) {
    console.error("Fetching the list of words failed due to ", error);
    alert(
      "Failed to load essential elements of this website. Please refresh the page and try again."
    );
  }
}

function countChars(word, char) {
  return word.split(char).length - 1;
}

// const userInput = "k:1,s:1,a:1,y:1,n:1,e:1";
// let lettersFromUserInput = [];

// function extractLetters(str, arr) {
//   for (let char of str) {
//     if (/^[a-zA-Z]/.test(char)) {
//       arr.push(char);
//     }
//   }
//   return arr;
// }

// const givenLetters = "u:1,n:1,d:2,e:1,r:1,h:1";
// const testString =
//   "dedd, deed, deeded, deedeed, deener, deer, dene, denned, denude, denuded, denuder, dere, derere, dern, derned, derner, dree, dreed, dudder, dude, dudeen, duende, duer, duhr, dundee, dunder, dune, dunne, dunned, dunner, dure, dured, duree, durene, durn, durned, durr, edder, eden, eheu, ende, ended, ender, endere, endue, endued, endure, endured, endurer, ened, enure, enured, erer, erne, erred, eure, hede, heder, heed, heeded, heeder, heer, hehe, hend, henen, herd, herded, herder, here, hern, herne, herr, hued, huer, hund, hunder, hundred, hunh, hunner, hurden, hure, hurr, hurrer, huurder, nedder, need, needed, needer, needn, neer, nehru, nene, nerd, nere, nudd, nude, nuder, nunned, redd, redded, redden, redder, rede, reded, redeed, redue, reed, reeded, reeden, reeder, reen, rend, rended, render, rendu, renn, renne, renner, renu, reree, rerun, reune, rheen, rudd, rudder, rude, ruder, rued, ruen, ruer, rune, runed, runer, runner, ruru, udder, uddered, uhuru, unde, undee, unden, under, underer, undern, undue, undure, unended, unheed, unhende, unherd, unhued, unred, unrude, unrued, unrun, unured, unurn, unurned, urde, urdee, urdu, urheen";
// const testArray = testString.split(", ");
// console.log(testArray);

// const refinedArray = testArray.filter((element) => {
//   const givenLettersArray = givenLetters.split(",");
//   return givenLettersArray.every((combination) => {
//     const [letter, numberOfTimes] = combination.split(":").map((i) => i.trim());
//     return countChars(element, letter) <= parseInt(numberOfTimes, 10);
//   });
// });

// console.log(refinedArray);

//   const meetsSecondCriteria = meetsFirstCriteria.filter((word) => {
//     const matchNumberOftimes = lettersInWord.some((combination) => {
//       const [letter, numberOfTimes] = combination
//         .split(":")
//         .map((element) => element.trim());
//       return numberOfTimes === countChars(word, letter);
//     });
//     if (matchNumberOftimes) return word;
//   });

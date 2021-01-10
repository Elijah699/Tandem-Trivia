fetch("/assets/Question/Tandem_Questions/Apprentice_TandemFor400_Data.json")
  .then((res) => res.json())
  .then((res) => updateGame(res));

const updateGame = (data) => {
  let questions = data;
  let randomIndexesOfQuestions = [];
  let questionsToAsk = [];

  function pickTen() {
    // choose a random number between 0 and (array.length - 1).
    let randomIndex = Math.round(Math.random() * (questions.length - 1));

    // if number was already picked, don't pick it again.
    if (!randomIndexesOfQuestions.includes(randomIndex)) {
      randomIndexesOfQuestions.push(randomIndex);
    }

    //  if after the number was picked the length of the random indexes is 10,
    //  pick the questions with those indexes and add them to the new array.

    if (randomIndexesOfQuestions.length === 10) {
      questionsToAsk = randomIndexesOfQuestions.map(
        (indexOfQuestion) => questions[indexOfQuestion]
      );
    } else {
      // if 10 questions are not picked yet, pick again.
      pickTen();
    }
  }

  pickTen();

  let question__index = 0;
  let currentNum = 1;
  let scores = 0;

  function renderQuestion() {
    if (question__index === 10) {
      document.getElementById("game").classList.add("d-none");
      document.getElementById("score__page").innerHTML = scorePage();
      document.getElementById("score__page").classList.remove("d-none");
    } else {
      document.getElementById("current__question").innerHTML =
        questionsToAsk[question__index].question;

      document.getElementById("option__list").innerHTML = updateAnswers(
        questionsToAsk[question__index].incorrect,
        questionsToAsk[question__index].correct
      );

      document.getElementById("question__num").innerHTML = currentNum;
    }
  }

  renderQuestion();

  const element = document.getElementById("option__list");
  element.addEventListener("click", function (e) {
    let correctElem = "";

    let optionList = document.getElementsByClassName("list");

    for (let i = 0; i < optionList.length; i++) {
      // Get the correct option to allow styling when the wrong option is clicked
      if (optionList[i].innerText === questionsToAsk[question__index].correct) {
        correctElem = i;

        // console.log(correctElem);
      }
    }

    if (e.target.classList.contains("list")) {
      if (e.target.innerText === questionsToAsk[question__index].correct) {
        e.target.style.backgroundColor = "green";

        scores++;
        //console.log(scores);
      } else {
        optionList[correctElem].style.backgroundColor = "green";

        e.target.style.backgroundColor = "#ed2939";
      }
      // console.log(e.target.className);
      setTimeout(renderQuestion, 1000, question__index++, currentNum++);
    }
  });

  // Scores Page

  function scorePage() {
    if (scores >= 8) {
      return `
      <div class="text-center">
        <h3>Quiz Ninja!!!</h3>
        <h4>You've come to the end of this Trivia section. You scored <i>${scores}</i>  out of 10.</h4>
    
        <h4>You have an outstanding performance. KuDoS!</h4>
    
        <div class="my-3">
        <a href="assets/Question/question.html">
        <button class="btn btn-success rounded mx-3"> Retake Trivia</button>
        </a>
    
        <a href="/index.html">
        <button class="btn btn-outline-success rounded">Back to Homepage</button>
        </a>
        </div>
      </div>

       `;
    } else {
      return `
      <div class="text-center">
        <h3>Welldone!!!</h3>

        <h4>You've come to the end of this Trivia section. You score <i>${scores}</i>  out of 10</h4>

        <h4>You did well, but you can do better. Give it another try?</h4>

        <div class="my-3">
        <a href="/assets/Question/question.html">
        <button class="btn btn-success rounded m-2"> Retake Trivia</button>
        </a>

        <a href="/index.html">
        <button class="btn btn-outline-success rounded m-2">Back to Homepage</button>
        </a>
        </div>
      </div>
    `;
    }
  }
};

// Manipulate answer position
function updateAnswers(incorrect, correct) {
  let startIndex = Math.floor(Math.random() * 4);
  let deleteCount = 0;
  let arr = incorrect;
  let newA = correct;

  arr.splice(startIndex, deleteCount, newA);
  return `
    <li class="list pointer">${arr[0]}</li>
    <li class="list pointer">${arr[1]}</li>
    <li class="list pointer">${arr[2]}</li>
    <li class="list pointer">${arr[3]}</li>`;
}

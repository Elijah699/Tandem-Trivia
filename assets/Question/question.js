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
    }
    
    else {
      // if 10 questions are not picked yet, pick again.
      pickTen();
    }
  }

  pickTen();

  let question__index = 0;

  document.getElementById("currentQuestion").innerHTML =
    questionsToAsk[question__index].question;

  document.getElementById("option__list").innerHTML = updateAnswers(
    questionsToAsk[question__index].incorrect,
    questionsToAsk[question__index].correct
  );

  const element = document.getElementById("option__list");
element.addEventListener("click",  function (e)  {
 
  console.log(this.className);

 console.log(e.currentTarget === this);

 if (e.target.innerText === questionsToAsk[question__index].correct) {
  document.e.target.style.backgroundColor = "red";
  
  // let g = document.getElementsByTagName("li");
  //  g.style.backgroundColor = "lightblue";
   
 } else {
   console.log("grey");
 }
} );

};



// Manipulate answer position
function updateAnswers(incorrect, correct) {
  let startIndex = Math.floor(Math.random() * 4);
  let deleteCount = 0;
  let arr = incorrect;
  let newA = correct;

  arr.splice(startIndex, deleteCount, newA);
  return `
    <li class="list">${arr[0]}</li>
    <li class="list">${arr[1]}</li>
    <li class="list">${arr[2]}</li>
    <li class="list">${arr[3]}</li>`;
};

















//   for( var i = 0; i < questionsToAsk.length; i++) {
  //     // console.log(questionsToAsk[questionToDisplay + i]);
  //     document.getElementById("currentQuestion").innerHTML = questionsToAsk[questionToDisplay].question;

  // console.log(updateAnswers(questionsToAsk[questionToDisplay].incorrect, questionsToAsk[questionToDisplay].correct));

  //     document.getElementById("")

  //   };

  // document.getElementById("question").innerHTML = questionsToAsk.map(
  //   (index, num) => `
  //      <div>

  //          <h3 class="">${index.question}</h3>
  //          ${updateAnswers(index.incorrect, index.correct)}

  //            <div>
  //            <h4> Question <span class=""> ${(num += 1)}</span> of 10</h4>
  //            </div>
  //      </div>
  // `
  // );

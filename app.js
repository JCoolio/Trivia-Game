(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // store answers choices
      const answers = [];

      // and for each available answer
      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of answers
    let numCorrect = 0;

    // for each question
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find the answer choosen
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "Whats My Catch Phrase?",
      answers: {
        a: "Wub Lub Dub Dub",
        b: "Im Pickle Rick",
        c: "I Don't Have A Catch Phrase What Is This A Superhero Movie"
      },
      correctAnswer: "c"
    },
    {
      question: "What Is My True Enemey?",
      answers: {
        a: "The President",
        b: "The Council Of Ricks",
        c: "Both All Goverments Suck!"
      },
      correctAnswer: "c"
    },
    {
      question: "How Do I Travel Across Dimesions ?",
      answers: {
        a: "With My Mind",
        b: "Portal Gun",
        c: "Flying Car",
        d: "Burrrrp All Of Them Cause My Mind Created My Portal Gun And The Flying Car!"
      },
      correctAnswer: "d"
    }
  ];

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();

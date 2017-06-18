$(document).ready( function() {
  // Declare objects (actual trivia questions) in an array of objects
  var questions = [
    {
      question: "what is a?",
      answers: ["a", "b", "c", "d"],
      values: [true, false, false, false]
    },
    {
      question: "what is e?",
      answers: ["e", "f", "g", "h"],
      values: [false, true, false, false]
    },
    {
      question: "what is i?",
      answers: ["i", "j", "k", "l"],
      values: [false, true, false, false]
    }]

  // Very important for tracking questions. This will track the player's progress through the questions. When this value is equal to questions.length - 1 the score screen will appear
  var currentQuestion = 0;
  var correct = 0; //records number of correct answers
  var wrong = 0; //records number of wrong answers
  var none = 0; //records unanswered (timed out) questions

  // End variable area
  //-----------------------------------------------------------------------------------
  // Functions below

  // On-click start function
  $("#start").on("click", function() {
    $("#start").remove();
    displayQ();
  })



  // This function will display the timer, question, and 
  function displayQ() {
    // Removes the prior message

    $(".message-content").remove();
    
    // Create the html elements that will constitute the timer, question, and later, the answer area. These are all assigned to a proper variable name
    var questionArea = $("<div>");
    var timer = $("<h2>")
    var question = $("<h2>")

    // Append elements to the content area, so they display properly
    questionArea.appendTo("#content")
    timer.appendTo(questionArea)
    question.appendTo(questionArea)

    // Set up the timer.
    var time = 30;
    timer.html("<h2>" + time + " seconds remaining</h2>")
    
    // Countdown function that will stop when the time hits 0
    var countDown = setInterval( function() {
      time--;
      timer.html("<h2>" + time + " seconds remaining</h2>")

      // If time reaches 0, the question times out, none increases in value, and the timedOut function is called
      if (time === 0) {
        clearInterval(countDown)
        questionArea.remove();
        none++;
        timedOut();
      }
    }, 1000);

    // Display the question. I'm using the currenQuestion value to reach into the array of objects and pull the proper question.
    question.html(questions[currentQuestion].question)

    // Display the answers as list items using a for loop
    for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
      var answers = $("<button>")
      answers.html(questions[currentQuestion].answers[i])
      answers.addClass("answer-buttons")
      answers.attr("value", questions[currentQuestion].values[i])
      answers.appendTo(questionArea)
    };


    // If and else if statements to determine what happens, depending on correct answer clicked, or incorrect
    // First, the click cases
    $(".answer-buttons").on("click", function() {
      //checking value of 'this'
      console.log($(this).attr("value"));

      // If the value is true, clear the content area, stop the counter, and display the correct answer screen
      if ($(this).attr("value") === "true") {
        questionArea.remove();
        clearInterval(countDown);
        correct++;
        displayCorrect();  
      };
      // If false, clear content area, stop counter, and display wrong answer screen
      if ($(this).attr("value") === "false") {
        questionArea.remove();
        clearInterval(countDown)
        wrong++;
        displayWrong();
        
      };
    });
  };

  //------------------------------------------------------------------------------------------
  // Block of post-question displays (what shows up when you click or time out)

  // This function will display the correct answer screen
  function displayCorrect() {
    var cycle = setTimeout(displayQ, 5000)
    var messageArea = $("<div>");
    messageArea.addClass("message-content")
    var winMessage = $("<h2>");
    messageArea.appendTo($("#content"));
    winMessage.appendTo($(messageArea));
    winMessage.text("Correct!")
    currentQuestion++;

    // If there are no questions left, then run this function to display gameOver
    if (currentQuestion === (questions.length - 1)) {
      gameOver();
      clearTimeout(cycle);
    }
  };
  // This function will display the wrong answer screen
  function displayWrong() {
    var cycle = setTimeout(displayQ, 5000);
    var messageArea = $("<div>");
    messageArea.addClass("message-content")
    var lossMessage = $("<h2>");
    messageArea.appendTo($("#content"));
    lossMessage.appendTo(messageArea)
    lossMessage.html("Wrong! The right answer was: " + questions[currentQuestion].answers[questions[currentQuestion].values.indexOf(true)]);
    currentQuestion++;
    if (currentQuestion === (questions.length - 1)) {
      gameOver();
      clearTimeout(cycle);
    }
  }

  // This will display the time out screen
  function timedOut() {
    var cycle = setTimeout(displayQ, 5000);
    var messageArea = $("<div>");
    messageArea.addClass("message-content")
    var lossMessage = $("<h2>");
    messageArea.appendTo($("#content"));
    lossMessage.appendTo(messageArea)
    lossMessage.html("You timed out! The right answer was: " + questions[currentQuestion].answers[questions[currentQuestion].values.indexOf(true)]);
    currentQuestion++;
    if (currentQuestion === (questions.length)) {
      gameOver();
      clearTimeout(cycle);
    }
  };
  // This will display when the currentQuestion amount is equal to questions.length - 1. In other words, when all questions have been answered
  function gameOver() {
    var totalCorrect = $("<h3>")
    var totalIncorrect = $("<h3>")
    var totalNone = $("<h3>")
    var restart = $("<button>")
    totalCorrect.appendTo($("#content"))
    totalCorrect.html("You got: " + correct + " correct!")
    totalIncorrect.appendTo("#content")
    totalIncorrect.html("You got: " + wrong + " wrong.")
    totalNone.appendTo("#content")
    totalNone.html("You didn't answer " + none + " questions.")
    // Restart button
    restart.addClass("restart")
    restart.text("Restart")
    restart.appendTo($("#content"))

    //Reset button onclick function
    $(".restart").on("click", function() {
      totalCorrect.remove();
      totalIncorrect.remove();
      totalNone.remove();
      restart().remove();
      currentQuestion = 0;
      correct = 0; //records number of correct answers
      wrong = 0; //records number of wrong answers
      none = 0;
      displayQ();
    })

  }

})



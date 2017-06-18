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
      vales: [false, true, false, true]
    },
    {
      question: "what is c?",
      answers: ["a", "b", "c", "d"],
      values: [false, true, false, false]
    }]

  // Very important for tracking questions. This will track the player's progress through the questions. When this value is equal to questions.length - 1 the score screen will appear
  var currentQuestion = 0;

  // End variable area
  //-----------------------------------------------------------------
  // Functions below

  // On-click start function
  $("#start").on("click", function() {
    $("#start").remove();
    displayQ();
  })



  // This function will display the timer, question, and 
  function displayQ() {
    
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
      time--
      timer.html("<h2>" + time + " seconds remaining</h2>")

      if (time === 0) {
        clearInterval(countDown)
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
    }

  
  
    // If and else if statements to determine what happens, depending on correct answer clicked, incorrect clicked, or time out
    // First, the click cases
    $(".answer-buttons").on("click", function() {
      //checking value of 'this'
      console.log($(this).attr("value"))

      // If the value is true, clear the content area, stop the counter, and display the correct answer screen
      if ($(this).attr("value") === "true") {
        //displayCorrect();
        clearInterval(countDown)
        questionArea.remove();
      }

      else if ($(this).attr("value") === "false") {
        //displayWrong();
        clearInterval(countDown)
      }
    })


  

    



    
  }

})



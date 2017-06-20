$(document).ready( function() {
  // Declare objects (actual trivia questions) in an array of objects
  var questions = [
    {
      question: "This film, released in 1958 and directed by Akira Kurosawa, is considered one of the greatest inspirations for George Lucas' Star Wars: Episode IV - A New Hope.",
      answers: ["The Hidden Fortress", "Seven Samurai", "Rashomon", "Tokyo Story"],
      values: [true, false, false, false],
      detail: "While The Hidden Fortress is a story about a princess and her protectors, George Lucas has stated that was more interested in how the story was told through the eyes of two lesser characters. In The Hidden Fortress it is the two thieves. In Star Wars C3PO and R2D2 fill these roles.",
      gif: "assets/images/hidden-fortress.gif",
    },
    {
      question: "What is the name of the japanese film genre that was originally popularized by the film Godzilla? In English, this term can be translated as 'strange beast'.",
      answers: ["Yokai", "Yakuza", "Kaiju", "Anime"],
      values: [false, false, true, false],
      detail: "The genre generally features giant monsters attacking major cities and battling with the local military and sometimes other giant monsters. In the original film, Godzilla was meant to be a metaphor for nuclear weapons and their destructive capability.",
      gif: "assets/images/godzilla.gif",
    },
    {
      question: "This \"dynamic and ferocious\" actor is most famous for his work with director Akira Kurosawa in such movies as Rashomon, Yojimbo, and Seven Samurai.",
      answers: ["Takeshi Shimura", "Toshiro Mifune", "Hayao Miyazaki", "Tatsuya Nakadai"],
      values: [false, true, false, false],
      detail: "Toshiro Mifune was considered the most famous Japanese actor of his age. He appeared in 170 feature films, but is best known for the 16 he made with Akira Kurosawa.",
      gif: "assets/images/mifune.gif",
    },
    {
      question: "This animated film made in 2001 by Studio Ghibli is the highest grossing film in Japan.",
      answers: ["Princess Monoke", "My Neighbor Totoro", "Howl's Moving Castle", "Spirited Away"],
      values: [false, false, false, true],
      detail: "Spirited Away even overtook Titanic in Japan, with a total gross of over 30 billion yen.",
      gif: "assets/images/spirited-away1.gif",
    },
    {
      question: "In the 1980 film Kagemusha, what does the term kagemusha refer to?",
      answers: ["Political Decoy", "Peasant", "Masterless Samurai", "Assassin"],
      values: [true, false, false, false],
      detail: "In the film a lowly thief is used to impersonate a dying warlord to fool his enemies.",
      gif: "assets/images/kagemusha.gif",
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
   $("#start").fadeToggle("slow", displayQ) 
  
  })



  // This function will display the timer, question, and 
  function displayQ() {
    // Removes the prior message
    $(".message-content").remove();
    $("#start").remove();
    
    // Create the html elements that will constitute the timer, question, and later, the answer area. These are all assigned to a proper variable name
    var questionArea = $("<div>");
    questionArea.attr("id", "question-area")
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
        questionArea.fadeToggle("slow", timedOut)
        none++;
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
      answers.attr("id", "a" + i)
      answers.appendTo(questionArea)
    };

    // Slides the answers into place
    $("#a0").animate({"left": "+=600px"})



    // If and else if statements to determine what happens, depending on correct answer clicked, or incorrect
    // First, the click cases
    $(".answer-buttons").on("click", function() {
      //checking value of 'this'
      console.log($(this).attr("value"));

      // If the value is true, clear the content area, stop the counter, and display the correct answer screen
      if ($(this).attr("value") === "true") {
        questionArea.fadeToggle("slow", displayCorrect)
        clearInterval(countDown);
        correct++;
      };
      // If false, clear content area, stop counter, and display wrong answer screen
      if ($(this).attr("value") === "false") {
        questionArea.fadeToggle("slow", displayWrong)
        clearInterval(countDown)
        wrong++;
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
    // Declare content that will go into the messageArea
    var winMessage = $("<h2>");
    var detail = $("<h2>")
    var image = $("<img>")
    // Append it all to the content container and add text and images
    messageArea.appendTo($("#content"));
    winMessage.appendTo($(messageArea));
    detail.appendTo($(messageArea))
    image.appendTo($(messageArea))
    winMessage.text("Correct!");
    detail.text(questions[currentQuestion].detail)
    image.attr("src", questions[currentQuestion].gif)


    // If there are no questions left, then run this function to display gameOver
    if (currentQuestion === (questions.length - 1)) {
      clearTimeout(cycle);
      var gameEnd = setTimeout( gameOver, 5000)
    }
    currentQuestion++;
  };
  // This function will display the wrong answer screen
  function displayWrong() {
    var cycle = setTimeout(displayQ, 5000);
    var messageArea = $("<div>");
    messageArea.addClass("message-content")
    var lossMessage = $("<h2>");
    var detail = $("<h2>")
    var image = $("<img>")
    // Append it all to the content container and add text and images
    messageArea.appendTo($("#content"));
    lossMessage.appendTo(messageArea)
    detail.appendTo($(messageArea))
    image.appendTo($(messageArea))
    lossMessage.html("Wrong! The right answer was: " + questions[currentQuestion].answers[questions[currentQuestion].values.indexOf(true)]);
    detail.text(questions[currentQuestion].detail)
    image.attr("src", questions[currentQuestion].gif)

    // If there are no questions left, then run this function to display gameOver
    if (currentQuestion === (questions.length - 1)) {
      clearTimeout(cycle);
      var gameEnd = setTimeout( gameOver, 5000)
    }
    currentQuestion++;
  };

  // This will display the time out screen
  function timedOut() {
    var cycle = setTimeout(displayQ, 5000);
    var messageArea = $("<div>");
    messageArea.addClass("message-content")
    var lossMessage = $("<h2>");
    var detail = $("<h2>")
    var image = $("<img>")
    // Append it all to the content container and add text and images
    messageArea.appendTo($("#content"));
    lossMessage.appendTo(messageArea)
    detail.appendTo($(messageArea))
    image.appendTo($(messageArea))
    lossMessage.html("You timed out! The right answer was: " + questions[currentQuestion].answers[questions[currentQuestion].values.indexOf(true)]);
    detail.text(questions[currentQuestion].detail)
    image.attr("src", questions[currentQuestion].gif)

    // If there are no questions left, then run this function to display gameOver
    if (currentQuestion === (questions.length - 1)) { 
      clearTimeout(cycle);
      var gameEnd = setTimeout( gameOver, 5000)
    }
    currentQuestion++;
  };

  // This will display when the currentQuestion amount is equal to questions.length - 1. In other words, when all questions have been answered
  function gameOver() {
    // Clear out the post-question message
    $(".message-content").remove();
    var totalCorrect = $("<h3>")
    var totalIncorrect = $("<h3>")
    var totalNone = $("<h3>")
    var restart = $("<button>")
    totalCorrect.appendTo($("#content"))
    totalCorrect.html("You got " + correct + " correct!")
    totalIncorrect.appendTo("#content")
    totalIncorrect.html("You got " + wrong + " wrong.")
    totalNone.appendTo("#content")
    
    // If block to determine if question or questions should be used
    if (none === 1) {
      totalNone.html("You didn't answer " + none + " question.")
    }
    if (none > 1 || none === 0) {
      totalNone.html("You didn't answer " + none + " questions.")
    }
    
    
    // Restart button
    restart.addClass("restart")
    restart.text("Restart")
    restart.appendTo($("#content"))

    //Reset button onclick function
    $(".restart").on("click", function() {
      totalCorrect.remove();
      totalIncorrect.remove();
      totalNone.remove();
      restart.remove();
      currentQuestion = 0;
      correct = 0; //records number of correct answers
      wrong = 0; //records number of wrong answers
      none = 0;
      displayQ();
    })

  }

})



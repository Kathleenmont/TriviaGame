
// name some global variables 
var images = ["assets/images/peppermint.gif", "assets/images/alyssaReaction.gif", "assets/images/needles.gif", "assets/images/latrice.gif", "assets/images/vanjie.gif", "assets/images/bobz.gif", "assets/images/shea.gif"];
var questions = ["Which queen was the season 9 runner up?", "Which queen went as Joan Crawford in The Snatch Game?", "In the episode 'RuPocalypse Now!' who was the winner of the post-apocalyptic runway challange?", 'Which Queen can we attribut the catchphrase "The shade of it all" to?', 'Which queen won the lip sync that sent home Vanessa Vanjie Mateo but gave the world the famous "Miss Vanjie" exit?', "Which queen is Mis Cracker's Drag Mother? ", "Which queen won more challenges then her seasons winner did?"];
var possibleAnswers = [["Trinity 'The Tuck' Taylor", "Shea Couleé", "Peppermint", "Valintina"], ["Jinkx Monsoon", "Sasha Velour", "BenDeLaCreme", "Alyssa Edwards"], ["Sharon Needles", "Phi Phi O'Hara", "Alaska", "Monique Heart"], ["Alyssa Edwards", "Latrice Royal", "Shangela", "Aja"], ["Mayhem Miller", "Dusty Ray Bottoms", "Kalorie Karbdashian Williams", "The Vixen"], ["Thorgy Thor", "Monet Exchange", "Asia O'hara", "Bob the Drag Queen"], ["Trinity 'The Tuck' Taylor", "Valentina", "Shea Coulee", "Blair St. Clair" ]];
var correctAnswers = ["c", "d", "a", "b", "c", "d", "c"];
var correctAnswerText = ["Peppermint", "Alyssa Edwards", "Sharon Needles", "Latrice Royal", "Kalorie", "Bob", "Shea Coulee"];
var message = "";
var questionNumber = 0;
var totalRight = 0;
var totalWrong = 0;
var timerCount = 20;
var timer;




// make a start game function that starts at questionNumber and stats at 0 and calls the next slide function
function startGame() {
    $('#container').css('display','block');
    $('#correct-incorrect').css('display','none');
    $('#timer').css('display','none');
    $('.question-button').css('display','none');
    clearInterval(timer);
    
   
    // create start button
    var startBtn = $("<button>");
    startBtn.addClass("start-button")
    startBtn.text("Press to Start")
    $("#answers").append(startBtn);
   

    //add start message
    $("#question").text("Press button to start your engines! And may the best woman, win!")
    
    // set stats
    questionNumber = 0;
    totalRight = 0;
    totalWrong = 0;

    $(".start-button").on("click", function () {
        nextSlide();
    });
   
}
startGame();

//  make a timer countdown function that displays for a certain amount of time
 function countDownTimer() {
    $("#timer").text(timerCount);
    timerCount--;
    if (timerCount === 0) {
        clearInterval(timer);
        totalWrong++;
        incorrectSlide();
        
    }
}


function myTimer() {
     timer = setInterval(countDownTimer, 1000);
}

// make an end of game funciton
function endOfGame() {
    clearInterval(timer);

    // display message
    $("#message").text("Look how well you did!")
    // display stats
    $("#message").append(" \nYou got " + totalRight + " questions right!")
    $("#message").append(" \nAnd " + totalWrong + " questions wrong.")
   

    // create do again button
    var startOverBtn = $("<button>");
    startOverBtn.addClass("start-over-button")
    startOverBtn.text("Do Again")
    $("#message").append(startOverBtn);

    // if hit startaGame
    $(".start-over-button").on("click", function () {
        startGame();
    });
}


// make a function that checks if questionNumber is the last question called lastQuestion()
function lastQuestionCheck() {
    if (questionNumber === questions.length - 1) {
        lastQuestion = true;
    } else {
        lastQuestion = false;
    }
}


// make function for if got answer right that shows a pic or vid and 
function correctSlide() {
    clearInterval(timer);
    $('#container').css('display','none');
    $('#correct-incorrect').css('display','block');
    
    // displays gif with DOM
    $("#image-space").html("<img src=" + images[questionNumber] + " width='400px'>")
    // displays a congratulation message 

    $("#message").html("Congratulations! You got that one right. \nYou're a winner, Baby!").wrap('<pre />');
    // calls lastQuestion function if returned false
    lastQuestionCheck();
    if (lastQuestion === true) {
        setTimeout(endOfGame, 5000);
        clearInterval(timer);

    } else {
        setTimeout(questionNumber++);
        setTimeout(nextSlide, 5000);
        clearInterval(timer);
    }
}

// make function for if got answer wrong that shows a pic or vid and 
function incorrectSlide() {
    clearInterval(timer);
    $('#container').css('display','none');
    $('#correct-incorrect').css('display','block');

    // displays gif with DOM
    $("#image-space").html("<img src=" + images[questionNumber] + " width='400px'>")
   // message and displays the correct answer
   $("#message").html("Not quite. The correct answer was " + correctAnswerText[questionNumber] + ".\nNext time you better werk!").wrap('<pre />');
   // check if last question
   lastQuestionCheck();
   if (lastQuestion === true) {
     setTimeout(endOfGame, 5000);

   } else {
    setTimeout(questionNumber++);
    setTimeout(nextSlide, 5000);
   }

}


// make a next slide function 
function nextSlide() {
    
    $('#container').css('display','block');
    $('#correct-incorrect').css('display','none');
    $('#timer').css('display','block');
    $('.question-button').css('display','block');
    
     //  set and display timer countdown
     timerCount = 10;
    
     myTimer();
   

    // display question
    $("#answers").html("");
    
    $("#question").text(questions[questionNumber]);
    // display answers on buttons make 4 buttons with DOM 
    for (var i = 0; i < 4; i++) {

        var questionBtn = $("<button>");
        // create classes and letter values
        var letter = ["a", "b", "c", "d"];
        questionBtn.addClass("question-button");
        questionBtn.attr("data-value", letter[i]);
        questionBtn.addClass("" + letter[i]);


        // add questions to the buttons
        questionBtn.text(possibleAnswers[questionNumber][i]);
        $("#answers").append(questionBtn);
       
    }




    $(".question-button").on("click", function () {
        // store the value of clicked answer
        var userClicked = $(this).attr("data-value");


        // logic for checking if answer is correct against userClicked variable
        if (userClicked === correctAnswers[questionNumber]) {
            // if correct go to correct function/slide and totalRight++
            correctSlide();
            totalRight++;
        } else if  (userClicked !== correctAnswers[questionNumber]) {
            // if wrong 
            incorrectSlide();
            totalWrong++;
        }

    });

}









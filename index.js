var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var finished = true;
var level = 0;
var highestScore = 0;


//Key Presses for restart
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    
    setTimeout(function(){
        nextSequence();

    }, 300);
    
    started = true;
    finished =false;
  }
});



//Main Buttons
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});




  //checks ans and displays outcome
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

        playSound("correct");
        $("body").addClass("correct");
      

      setTimeout(function () {
        $("body").removeClass("correct");
      }, 200);

      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").html("<h6>Game Over, Press Any Key to Restart</h6>");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      finished = true;

      startOver();
    }
}

//Clears user pattern and adds color to game pattern
function nextSequence() {
  userClickedPattern = [];
  level++;
  
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(400).fadeIn(400);
  playSound(randomChosenColour);

  $("h3").text("Highest Score: " + highScore(level));
}

//Animates on press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 200);
}

//Plays sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Reset stats
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//Returns highest score
function highScore(lvl) {

    if (level > highestScore) {highestScore = lvl -1;}
    return highestScore;
}

//Restart/Refresh Button
$(".restart").click(function() {
    if (finished) {
        startOver();
        nextSequence();
        finished = false;
    }

    else {
        $("#" + gamePattern[gamePattern.length-1]).fadeIn(100).fadeOut(400).fadeIn(400);
    }
    
    
  });

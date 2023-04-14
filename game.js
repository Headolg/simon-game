// deno-lint-ignore-file no-var

var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

// Start-Functions
function nextSequence() {
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn();
  playSounds(randomChosenColor);
}

function playSounds(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSounds("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  var check = true;
  $(document).keydown(function () {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];

    if (check === true) {
      nextSequence();
      check = false;
    }
  });
}

// End-Functions

$(".btn").click(function () {
  var userChosenColor = this.id;

  userClickedPattern.push(userChosenColor);
  playSounds(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

var check = true;
$(document).keydown(function () {
  if (check === true) {
    nextSequence();
    check = false;
  }
});

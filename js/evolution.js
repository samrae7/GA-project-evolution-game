$(document).on('ready',function() {

console.log('js linked');

// var round = round1;
var currentRound;

var rounds = {

  round1: {
    number:1, 
    target: 3,
    bugsGreen: 4,
    bugsBlue: 16,
    bugsEatenTotal: 0,
    bugsEatenGreen: 0,
    bugsEatenBlue: 0,
    displayTargetOnIntro: function() {
      $('.bugIconStart').before('<p>Eat '+this.target+' or more bugs to survive the winter.')
    },
    successMessage:"<p>You got through your first year but you were attacked by a hawk and your injuries mean you won't be able to breed this season.</p><p>You'll need to eat more this year so that you can recover.</p>"
  },

  round2: {
    number:2,
    target: 3,
    bugsGreen:0,
    bugsBlue:0,
    bugsEatenTotal: 0,
    bugsEatenGreen: 0,
    bugsEatenBlue: 0,
    successMessage: "<p>You survived another winter but now you've caught a disease.</p><p>You are recovering but you do not have enough energy to try and breed this season.</p><p>You have to eat more in order to get your strength back.</p>"
  },

  round3: {
    number:3,
    target:3,
    bugsGreen:0,
    bugsBlue:0,
    bugsEatenTotal: 0,
    bugsEatenGreen: 0,
    bugsEatenBlue: 0,
    successMessage:"<p>This year you found a mate and bred. Your hatchlings are growing quickly and should be out of the nest soon.</p><p>You've done well so far but all these extra beaks to feed mean that you'll have to catch more bugs than ever.</p>"

  },

  round4: {
    number: 4,
    target: 3,
    bugsGreen:0,
    bugsBlue:0,
    bugsEatenTotal: 0,
    bugsEatenGreen: 0,
    bugsEatenBlue: 0,
    successMessage: "<p>Well done! You've made it through your fourth year and your offspring have flown the nest.</p><p>Did you find it easier to spot the blue bugs? If so the proportion of green bugs probably increased throughout the game.</p><p>This is a simplified example of how changes can happen as a result of natural selection.</p><p><a href='#'>Find out more about the theory of evolution.</a></p><p><a href='#'>Play again</a></p>"
  }
}


//generate random absolute position based on width and height of bug-field

function randomHeight() {
  var fieldHeight = $('.field').height();
  var randomHeight =Math.round(Math.random()*(fieldHeight-80));
  return (randomHeight+'px');
  };

function randomWidth() {
  var fieldWidth = $('.field').width();
  var randomWidth = Math.round(Math.random()*(fieldWidth-80));
  return (randomWidth+'px');
}

//create 10 bugs with random positions with '.field'
//??QUESTION: I wanted to have a 'bug' constructor that I could use here but it became confusing with jquery as jquery is essentially creating an array of objects(divs) that I then call using $/Jquery to add properties to. I couldn't fugure out how this would work in conjuction with a constructor function ( or even just defining the bugs as object literals)

function clearBugs() {
  $('.bug').remove();
  console.log('bugs cleared');
}

function populateField() {
  for (i=0;i<currentRound.bugsBlue;i++) {
    makeBug(i,'blue')
  }
  console.log('Blue bugs in this round: '+currentRound.bugsBlue)
  for (i=0;i<currentRound.bugsGreen;i++) {
    makeBug(i,'green')
  };
  console.log('Green bugs in this round: '+currentRound.bugsGreen)
  addClickEventBugs();
}

function makeBug(n,colour) {
  var bug = $('<div id="bug'+n+'">');
  bug.addClass('bug');
  bug.addClass(colour+'Bug');
  var imageChoice = Math.ceil(Math.random()*4);

  // if imageChoice ===1, then add Class 'up'
  // if imageChoice ===2, then add Class 'down'
  // function to moveBugs
  //    if $(this).hasClass('up') then moveBugUp()
  //    if $(this).hasClass('down') then moveBugDown()
  // 
  // setInterval({
  //   if class = 'upleft'
  //       change the pic to upright, give upright class, move position upright
  // })

  // bug.addClass(colour+'Bug'+imageChoice);
  bug.html('<img src="../images/'+colour+'-bug'+imageChoice+'.png">')
  bug.css('top',randomHeight())
  bug.css('left',randomWidth())
  $('.field').append(bug);
};

//put click event on all bugs so that they dissapear when clicked and increase the Score by one
function addClickEventBugs() {
  $('.bug').on('click', function(){
    eatBug(this);
    addScore();
  });
}

function eatBug(x){
  var bug = $(x)
  bug.addClass('eatenBug');
  if (bug.hasClass('greenBug')) {
    console.log('ate green bug');
    currentRound.bugsEatenGreen++;
    console.log('Green bugs eaten:'+currentRound.bugsEatenGreen)
  }
  else if (bug.hasClass('blueBug')) {
    console.log('ate blue bug');
    currentRound.bugsEatenBlue++;
    console.log('Blue bugs eaten: '+currentRound.bugsEatenBlue);
  }
}

function addScore(){
  currentRound.bugsEatenTotal++;
  updateScoreDisplay();
}

function resetScore() {
  currentRound.bugsEatenTotal=0;
  updateScoreDisplay();
}


function updateScoreDisplay(){
  $('.bugCount').html('Bugs eaten: '+currentRound.bugsEatenTotal)
}

function startGame() {
  $('.introBox').hide();
  currentRound = rounds.round1;
  populateField();
  $('.gameScreen').show();
  // $('.field').show();
  $('.infoBox').show();
  updateInfoBox();
  populateGraph();
  startTimer();
}

function restartRound() {
  $('.results').hide();
  $('.gameScreen').show();
  // $('.field').show();
  resetScore();
  // $('.infoBox').show();
  clearBugs();
  populateField();
  startTimer();
}

function startNextRound() {
  calculateGreenBlueRatio();
  $('.results').hide();
  $('.gameScreen').show();
  // $('.field').show();
  currentRound=rounds['round'+(currentRound.number+1)];
  // $('.infoBox').show();
  updateInfoBox();
  $('.graph').css('visibility','visible');
  populateGraph();
  clearBugs();
  populateField();
  startTimer();
}

function calculateGreenBlueRatio() {
  nextRound=rounds['round'+(currentRound.number+1)]
  nextRound.bugsGreen = Math.round((currentRound.bugsGreen - currentRound.bugsEatenGreen)*1.9);
  nextRound.bugsBlue = Math.round((currentRound.bugsBlue - currentRound.bugsEatenBlue)*1.3);
}

function updateInfoBox() {
  //put information (round name, target, bugs eaten so far) in info box
var stats = $('.stats');
stats.html('<h2>Year '+currentRound.number+'</h2>');
stats.append('<p>Target: '+currentRound.target+'</p>');
stats.append('<p class="bugCount">Bugs eaten: '+currentRound.bugsEatenTotal+'</p>');


}

//NB:at present the two functions startNextRound() and restartRound() are the same

//add event listener to start game
$('#start').on('click',startGame);

function startTimer(){
  // var id=window.setInterval(callback, delay);
  var percentage=100;
  count=0;
  var timer = setInterval(function() {
    var bar = $('.timerBar');
    percentage-=0.2;
    bar.width(percentage+'%');
    if(count > 500) {
      clearInterval(timer);
      displayResults();
    }
    count++;
  }, 10);
}

function populateGraph() {
  var greenBugs = currentRound.bugsGreen;
  var roundNumber = currentRound.number;
  var perCentGreenBugs = (greenBugs/20)*100

  $('#pop'+roundNumber).css('height',perCentGreenBugs);
}

function displayResults() {
  $('.gameScreen').hide();

  var results = $('<div class="results"></div>');
  results.insertBefore('.infoBox');

  var nextRound = rounds['round'+(currentRound.number+1)];
  console.log('Total bugs eaten this round '+currentRound.bugsEatenTotal);
  console.log('Target for this round:'+currentRound.target); 
  console.log('This is round number :'+currentRound.number);
  if (currentRound.bugsEatenTotal>=currentRound.target) {
    if (currentRound.number===4) {
       results.prepend(currentRound.successMessage);
      } else {
      var nextRoundButton = $('<button class="nextYear">Next year</button>');
      results.prepend(nextRoundButton);
      nextRoundButton.on('click',startNextRound);

      results.prepend('<p>Eat '+nextRound.target+' or more bugs to survive.</p>') 

      results.prepend(currentRound.successMessage);
      
      }
  } else if (currentRound.bugsEatenTotal<currentRound.target) {
    var tryAgainButton = $('<button class="tryAgain">Try Again</button>');
    results.prepend(tryAgainButton);
    tryAgainButton.on('click',restartRound);
    results.prepend('<p>You didn\'t eat enough bugs to survive the winter.</p>');
  }

  // results.prepend('<p>You ate '+  currentRound.bugsEatenTotal+' bugs</p>');

}

rounds.round1.displayTargetOnIntro();

});


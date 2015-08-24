$(document).on('ready',function() {

console.log('js linked');

// var round = round1;
var currentRound;

var rounds = {
  round1: {
    number:1,
    target: 3,
    bugsTotal: 20,
    bugsGreen: 4,
    bugsBlue: 16,
    bugsEatenTotal: 0,
    bugsEatenGreen: 0,
    bugsEatenBlue: 0,
    displayTargetOnIntro: function() {
      $('.introBox').prepend('<p>Eat '+this.target+' bugs to survive the winter.')
      }
    },
  round2: {
    number:2,
    target: 4,
    bugsTotal: 20,
    bugsGreen:0,
    bugsBlue:0,
    bugsEatenTotal: 0,
    bugsEatenGreen: 0,
    bugsEatenBlue: 0

  },

  round3: {
    number:3,
    target:5,
    bugsTotal: 20,
    bugsGreen:0,
    bugsBlue:0,
    bugsEatenTotal: 0,
    bugsEatenGreen: 0,
    bugsEatenBlue: 0

  },

  round4: {
    number: 4,
    target: 6,
    bugsTotal: 20,
    bugsGreen:0,
    bugsBlue:0,
    bugsEatenTotal: 0,
    bugsEatenGreen: 0,
    bugsEatenBlue: 0

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
  for (i=0;i<16;i++) {
    makeBug(i,'blue')
  }

  for (i=17;i<=20;i++) {
    makeBug(i,'green')
  };
  addClickEventBugs();
}

function makeBug(n,colour) {
  var bug = $('<div id="bug'+n+'">');
  bug.addClass('bug');
  var imageChoice=Math.ceil(Math.random()*4);
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
  $(x).addClass('eatenBug');
}

function addScore(){
  currentRound.bugsEatenTotal++;
  updateScoreDisplay();
}

function resetScore(round) {
  currentRound.bugsEatenTotal=0;
  updateScoreDisplay();
}


function updateScoreDisplay(){
  $('.bugCount').html('<p> Bugs eaten: '+currentRound.bugsEatenTotal+'</p>')
}

function startGame() {
  $('.introBox').hide();
  currentRound = rounds.round1;
  populateField();
  $('.gameScreen').show();
  $('.field').show();
  $('.infoBox').show();
  updateInfoBox();
  startTimer();
}

function restartRound() {
  $('.results').hide();
  $('.gameScreen').show();
  $('.field').show();
  resetScore();
  $('.infoBox').show();
  clearBugs();
  populateField();
  startTimer();
}

function startNextRound() {
$('.results').hide();
  $('.gameScreen').show();
  $('.field').show();
  resetScore();
  $('.infoBox').show();
  updateInfoBox();
  clearBugs();
  populateField();
  startTimer();
}

function updateInfoBox() {
  //put information (round name, target, bugs eaten so far) in info box
var infoBox = $('.infoBox');
infoBox.html('<p>Round '+currentRound.number+'</p>');
infoBox.append('<p>Target: '+currentRound.target+'</p>');

infoBox.append('<p class="bugCount">Bugs eaten: '+currentRound.bugsEatenTotal+'</p>');

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
      console.log('hi')
      displayResults();
    }
    count++;
  }, 10);
}

function displayResults() {
  $('.field').hide();

  var results = $('<div class="results"></div>');
  results.prependTo('.gameScreen');

  var nextRound = rounds['round'+(currentRound.number+1)];

  if (currentRound.bugsEatenTotal>=currentRound.target) {
    if (currentRound.number===4) {
       results.prepend('<p>Well done! You survived your fourth winter and you will be able to mate and pas on you genes</p>');
      } else {
      var nextRoundButton = $('<button class="nextYear">Next year</button>');
      results.prepend(nextRoundButton);
      nextRoundButton.on('click',startNextRound);

      results.prepend('<p>You survived the winter. This year you will need to eat '+nextRound.target+' bugs to survive</p>');
      }
  } else if (currentRound.bugsEatenTotal<currentRound.target) {
    var tryAgainButton = $('<button class="tryAgain">Try Again</button>');
    results.prepend(tryAgainButton);
    tryAgainButton.on('click',restartRound);
    results.prepend('<p>You didn\'t eat enough bugs to survive the winter.</p>');
  }

  results.prepend('<p>You ate '+  currentRound.bugsEatenTotal+' bugs</p>');
  currentRound=nextRound;

}

rounds.round1.displayTargetOnIntro();

});


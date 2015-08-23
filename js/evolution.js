$(document).on('ready',function() {

console.log('js linked');

var round1 = {
  target: 7,
  bugsTotal: 20,
  bugsGreen: 4,
  bugsBlue: 16,
  bugsEatenTotal: 0,
  bugsEatenGreen: 0,
  bugsEatenBlue: 0,
  displayTarget: function() {
  $('.introBox').prepend('<p>Eat '+round1.target+' bugs to survive the winter.')
    }
}

var round2 = {
  target: 9,
  bugsTotal: 20,
  bugsGreen:0,
  bugsBlue:0,
  bugsEatenTotal: 0,
  bugsEatenGreen: 0,
  bugsEatenBlue: 0
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
for (i=0;i<16;i++) {
  makeBug(i,'blue')
}

for (i=17;i<=20;i++) {
  makeBug(i,'green')
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

//put click event on all bugs so that they dissapear when clicked
$('.bug').on('click', function(){
  eatBug(this);
  addCount();
});

function eatBug(x){
  $(x).addClass('eatenBug');
}

function addCount(){
  round1.bugsEatenTotal++;
  updateScore();
}

function updateScore(){
  $('.infoBox').html('<p> Bugs eaten: '+round1.bugsEatenTotal+'</p>')
}

function startGame() {
  $('.introBox').hide();
  $('.gameScreen').show();
  $('.infoBox').show();
  startTimer();
}
  


round1.displayTarget();

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
    if(count > 500) {clearInterval(timer);
       displayResults();
     }
    count++;
  }, 10);
}

function displayResults() {
  $('.field').hide();
  var results = $('<div class="results"></div>');
  results.prependTo('.gameScreen');
  if (round1.bugsEatenTotal>=round1.target){
    results.prepend('<p>You survived the winter. This year you will need to eat '+round2.target+' bugs to survive</p>');
  } else if (round1.bugsEatenTotal<round1.target) {
    results.prepend('<p>You didn\'t eat enough bugs to survive the winter.</p>');
  }
  results.prepend('<p>You ate '+round1.bugsEatenTotal+' bugs</p>');

}

// function round1.displayTarget() {
//   $('.introBox').prepend('<p>Eat '+round1.target+' bugs to survive the winter.')
// }

});


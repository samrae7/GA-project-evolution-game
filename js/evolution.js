$(document).on('ready',function() {

console.log('js linked');

var bugCount=0;

//generate random absolute position based on width and height of bug-field
function randomHeight() {
  var fieldHeight = $('.field').height();
  var randomHeight =Math.round(Math.random()*(fieldHeight-80));
  return (randomHeight+'px');
  };

console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());
console.log(randomHeight());

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
  bugCount++;
  updateScore();
}

function updateScore(){
  $('.infoBox').html('<p> Bugs eaten: '+bugCount+'</p>')
}

function startGame() {
  $('.introBox').hide();
  $('.gameScreen').show();
  $('.infoBox').show();
  startTimer();
}
  
//make timer bar

//add event listener to start game
$('#start').on('click',startGame);

// function endTimer() {
//   //clears startTimer and brings up results of that round
//   alert('time up'); 
// }

// function startTimer() {
//   setTimeout(endTimer,5000);
//   // var percentage=100;
//   // var timer = setInterval(function() {
//   //   var bar = $('.timerBar');
//   //   percentage-=0.2;
//   //   bar.width(percentage+'%');
//   // }, 10);

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



});


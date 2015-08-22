$(document).on('ready',function() {

console.log('js linked');

var bugCount=0;

//generate random absolute position based on width and height of bug-field
function randomHeight() {
  var fieldHeight = $('.field').height();
  var randomHeight =Math.round(Math.random()*(fieldHeight-20));
  return (randomHeight+'px');
  };

function randomWidth() {
  var fieldWidth = $('.field').width();
  var randomWidth = Math.round(Math.random()*(fieldWidth-20));
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

function makeBug(n, colour) {
  var bug = $('<div id="bug'+n+'">');
  bug.addClass('bug');
  bug.css('top',randomHeight())
  bug.css('left',randomWidth())
  bug.css('background-color',colour)
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
  $('.infoBox').html('<p> Bug Count:'+bugCount+'</p>')
}
  
});
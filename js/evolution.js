$(document).on('ready',function() {

console.log('js linked');

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
for (i=0;i<10;i++) {
  var bug = $('<div id="'+i+'">');
  bug.addClass('bug');
  bug.css('top',randomHeight())
  bug.css('left',randomWidth())
  $('.field').append(bug);
  $('.field').append(bug);
};
  
});
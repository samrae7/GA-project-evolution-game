$(document).on('ready',function() {
  console.log('js linked');
  //create div element with class bug
  // var bug = $('<div>');
  // bug.addClass('bug');
  // bug.css({top:20px, left:20px}):
    //append it to body
  //  

  var bug = $('<div>');
  bug.addClass('bug');
  bug.css('top',randomHeight)
  bug.css('left',randomWidth)
  $('.field').append(bug);
  $('.field').append(bug);

  
  //generate random absolute position based onwidth and height of bug-field
function randomHeight() {
    var fieldHeight = $('.field').height();
    randomHeight =Math.round(Math.random()*fieldHeight);
    return (randomHeight+'px');
  };

function randomWidth() {
   var fieldWidth = $('.field').width();
 randomWidth = Math.round(Math.random()*fieldWidth);
 return (randomWidth+'px');
}
  //write function to create lots

});
//timeline.js
//used to display the timeline

var DEFAULT_DURATION = 800;
var MARKER_SEPARATION = 100;

function initTimeline(){
}

function initTimescale(){
  var duration = DEFAULT_DURATION;
  $ts = $('hr#timescale');
  $tm = $('div#timemarker');
  $ts.css('width', duration);
  $tm.css('width', duration);
  $tm.empty();
  for (var t = 0; t < duration; t+=MARKER_SEPARATION){
    $tm.append('<div>'+t.toString()+'</div>');
  }
}

function addItem(item, start, duration){
  
}

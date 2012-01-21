//timeline.js
//used to display the timeline

var DEFAULT_DURATION = 800;
var MARKER_SEPARATION = 100;

var bl_track = [];

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

function addTimelineItem(item, start, duration){
  //find a track that's available at start
  var found = false;
  var idx = 0;
  while (idx < bl_track.length){
    if (bl_track[idx] <= start){
      found = true;
      break;
    }
    idx++;
  }
  if (!found){
    bl_track.push(0);
  }
  var new_item_html = '<div style=\''+
            'position:absolute;'+
            'left: '+start+'px;'+
            'width: '+duration+'px;'+
            'top: '+idx*21+'px;'+
            '\'><img src=\''+window.last_action_img+
            '\'/></div>';
  bl_track[idx] = start+duration;
  $('div#build-list').append(new_item_html);
}

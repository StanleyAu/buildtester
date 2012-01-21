function initSelectRace(){
  $('div#core-wrapper').addClass('hide');
  $('div#select-race-wrapper').removeClass('hide');
  $('div.box.select-race').click(function(){
    var race = $(this).attr('id');
    setCommandPanel(race);
    $('div#select-race-wrapper').addClass('hide');
    $('div#core-wrapper').removeClass('hide');
  });
}

function setCommandPanel(race){
  //action commands
  var actions_html = '';
  for (var k in window.actions[race]){
    var cmd_html = '<div class=\'command-action\' id=\''+k+'\'>'+
                    '<img src=\'../static/img/'+race+'/'+window.actions[race][k]+'.png\'>'+
                    '</div>';
    actions_html += cmd_html;
  }
  $('div#command-action-wrapper').html(actions_html);
  //unit commands
  var units_html = '';
  for (var k in window.units[race]){
    var cmd_html = '<div class=\'command-unit\' id=\''+k+'\'>'+
                    '<img src=\'../static/img/'+race+'/'+k.replace(/[_-]/g, '')+'.png\'>'+
                    '</div>';
    units_html += cmd_html;
  }
  $('div#command-unit-wrapper').html(units_html);
  //building commands
  var buildings_html = '';
  for (var k in window.buildings[race]){
    var cmd_html = '<div class=\'command-building\' id=\''+k+'\'>'+
                    '<img src=\'../static/img/'+race+'/'+k.replace(/[_-]/g, '')+'.png\'>'+
                    '</div>';
    buildings_html += cmd_html;
  }
  $('div#command-building-wrapper').html(buildings_html);
  //research commands
  var researches_html = '';
  for (var k in window.researches[race]){
    var cmd_html = '<div class=\'command-research\' id=\''+k+'\'>'+
                    '<img src=\'../static/img/'+race+'/'+k.replace(/[_-]/g, '')+'.png\'>'+
                    '</div>';
    researches_html += cmd_html;
  }
  $('div#command-research-wrapper').html(researches_html);
  
  //setup the click event
  $('div.commands div').click(function(){
    console.log($(this).attr('class'), $(this).attr('id'));
  });
  
}

function initGlobal(){
  window.actions = {
    'terran':c_terran,
    'zerg':c_zerg,
    'protoss':c_protoss
  };
  window.units = {
    'terran':u_terran,
    'zerg':u_zerg,
    'protoss':u_protoss
  };
  window.buildings = {
    'terran':b_terran,
    'zerg':b_zerg,
    'protoss':b_protoss
  };
  window.researches = {
    'terran':up_terran,
    'zerg':up_zerg,
    'protoss':up_protoss
  };
}

$(document).ready(function(){
  initGlobal();
  initSelectRace();
});
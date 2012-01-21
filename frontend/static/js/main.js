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
    actions_html+='<img src=\'../static/img/'+race+'/'+window.actions[race][k]+'.png\'>';
  }
  $('div#command-action').html(actions_html);
  //unit commands
  var units_html = '';
  for (var k in window.units[race]){
    units_html+='<img src=\'../static/img/'+race+'/'+k.replace('_', '')+'.png\'>';
  }
  $('div#command-unit').html(units_html);
  //building commands
  var buildings_html = '';
  for (var k in window.buildings[race]){
    buildings_html+='<img src=\'../static/img/'+race+'/'+k.replace('_', '')+'.png\'>';
  }
  $('div#command-building').html(buildings_html);
  //research commands
  var researches_html = '';
  for (var k in window.researches[race]){
    researches_html+='<img src=\'../static/img/'+race+'/'+k.replace('_', '')+'.png\'>';
  }
  $('div#command-research').html(researches_html);
  
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
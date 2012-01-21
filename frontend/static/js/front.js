function loadUnits(filename) {
    $.getJSON(filename, function(data) {
        var spec = []
        $.each(data, function(unit,specs) {
            //add image later
            $("#unitbox").append('<p>'+'<ul>'+
                                 '<li>'+specs.mineral+'</li>'+
                                 '<li>'+specs.vespene+'</li>'+
                                 '<li>'+specs.supply+'</li>'+
                                 '</ul>'+'</p>')
        })
    })
}

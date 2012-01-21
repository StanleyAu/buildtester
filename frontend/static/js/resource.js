// resource types
    MW = 'mw' // mineral worker
    GW = 'gw' // gas worker
    MB = 'mb' // mining base
    ML = 'ml' // mule
    IM = 'im' // instant mineral
    IG = 'ig' // instant gas

var _arat = []; //arat = aggregated resource allocation timeline

var _ract = []; //ract = resource allocation change timeline
                //used for constructing the build order, might be unsorted
                //each entry is [time, type, value]
                
var _arat_dirty = false;

function addMinWorker(n, t){
    _ract.push([t, MW, n]);
    _arat_dirty = true;
}

function addMuleWorker(n, t){
    _ract.push([t, ML, n]);
    _arat_dirty = true;
}

function addMiningBase(t){
}

function addGasWorker(n, t){
}

function removeMinWorker(n, t){
}

function removeGasWorker(n, t){
}

function addMin(m, t){
}

function addGas(m, t){
}

function removeMin(m, t){
}

function removeGas(m, t){
}

function getGas(t){
}

function getMin(t){
}

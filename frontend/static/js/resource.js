// resource types
    MW = 'mw' // mineral worker
    GW = 'gw' // gas worker
    MB = 'mb' // mining base
    MG = 'mg' // mining geyser
    ML = 'ml' // mule
    IM = 'im' // instant mineral
    IG = 'ig' // instant gas

var _arat = []; //arat = aggregated resource allocation timeline
                //the index is the time, each entry is going to be [min, gas]

var _ract = []; //ract = resource allocation change timeline
                //used for constructing the build order, might be unsorted
                //each entry is [time, type, value]
                
var _arat_dirty = true; //if arat needs to be rebuilt,
                        
var MIN_RATE_16p = 0.72 //mineral per worker per second
                    //assuming not over saturation
var MIN_RATE_MULE = 2.26 //mineral per mule per second
var GAS_RATE_2p = 0.8
var GAS_RATE_3p = 0.67
                    //for gas, 2 is optimal number
                    //if we go 3/geyser, it is reduced to 0.67
function reset(){
    _ract = [[0, MW, 6],
             [0, MB, 1]]; //game starts with 6 mineral workers and a mining base
}
                          
function addMinWorker(n, t){
    _ract.push([t, MW, n]);
    _arat_dirty = true;
}

function addMuleWorker(n, t){
    _ract.push([t, ML, n]);
    _ract.push([t+90, ML, 0-n]);
    _arat_dirty = true;
}

function addMiningBase(t){
    _ract.push([t, MB, n]);
    _arat_dirty = true;
}

function addGeyser(n, t){
    _ract.push([t, MG, n]);
    _arat_dirty = true;
}

function addGasWorker(n, t){
    _ract.push([t, GW, n]);
    _arat_dirty = true;
}

function removeMinWorker(n, t){
    _ract.push([t, ML, 0-n]);
    _arat_dirty = true;
}

function removeGasWorker(n, t){
    _ract.push([t, GW, 0-n]);
    _arat_dirty = true;
}

function addMin(m, t){
    _ract.push([t, IM, n]);
    _arat_dirty = true;
}

function addGas(m, t){
    _ract.push([t, IG, n]);
    _arat_dirty = true;
}

function removeMin(m, t){
    _ract.push([t, IM, 0-n]);
    _arat_dirty = true;
}

function removeGas(m, t){
    _ract.push([t, IG, 0-n]);
    _arat_dirty = true;
}

function updateARAT(){
    if (!_arat_dirty){ //clean
        return;
    }
    var s_ract = _ract.sort(function(a, b){return b[0] - a[0]);
    var mb = 0; //mining base
    var mg = 0; //mining geyser
    var mw = 0; //mineral worker
    var gw = 0; //gas worker
    var ml = 0; //mule worker
    
    _arat = [[0,0]]; //initial value
    for (var i = 1; i < _arat.length; i++){
        var addmin = Math.min(mw*MIN_RATE_16p, mb*16*MIN_RATE_16p)+ml*MIN_RATE_MULE
        var addgas;
        if (gw <= mg*2){
            addgas = gw*GAS_RATE_2p;
        else if(gw <= mg*3){
            addgas = gw*GAS_RATE_3p;
        else{
            addgas = mg*3*GAS_RATE_3p;
        }
        _arat.push([_arat[i-1][0]+addmin, _arat[i-1][1]+addgas]);
        while (s_ract.length > 0 && s_ract[s_ract.length-1] == i){
            rac = s_ract.pop(); //[time, type, value]
            if (rac[1] == MW){
                mw += rac[2];
            }else if (rac[1] == GW){
                gw += rac[2];
            }else if (rac[1] == MB){
                mb += rac[2];
            }else if (rac[1] == MG){
                mg += rac[2];
            }else if (rac[1] == ML){
                ml += rac[2];
            }else if (rac[1] == IM){
                _arat[i][0] += rac[2];
            }else if (rac[1] == IG){
                _arat[i][1] += rac[2];
            }
        }
    }
}

function getGas(t){
    updateARAT();
    return _arat[t][1];
}

function getMin(t){
    updateARAT();
    return _arat[t][0];
}

// resource types
MW = 'mw' // mineral worker
GW = 'gw' // gas worker
MB = 'mb' // mining base
MG = 'mg' // mining geyser
ML = 'ml' // mule
IM = 'im' // instant mineral
IG = 'ig' // instant gas


var MIN_RATE_16p = 0.72 //mineral per worker per second
                    //assuming not over saturation
var MIN_RATE_MULE = 2.26 //mineral per mule per second
var GAS_RATE_2p = 0.8
var GAS_RATE_3p = 0.67
                    //for gas, 2 is optimal number
                    //if we go 3/geyser, it is reduced to 0.67

/*
    resource object:
    _arat: aggregated resource allocation timeline, an array with each entry as a timeslice
            representing in-game seconds, each entry is an array [mineral, gas]
    _ract: resource allocation change timeline, an array with resource changes such as worker and geyser addition/removal
            might be unsorted
    _arat_dirty: set if _ract has changed so that _arat needs to be re-aggregated
*/

                    
function init(d){
    //d is duration of the calculation
    this._ract = [[0, MW, 6],
             [0, MB, 1]]; //game starts with 6 mineral workers and a mining base
    this._arat_dirty = true;
    this.duration = d;
}
                          
function addMinWorker(n, t){
    this._ract.push([t, MW, n]);
    this._arat_dirty = true;
}

function addMuleWorker(n, t){
    this._ract.push([t, ML, n]);
    this._ract.push([t+90, ML, 0-n]);
    this._arat_dirty = true;
}

function addMiningBase(t){
    this._ract.push([t, MB, n]);
    this._arat_dirty = true;
}

function addGeyser(n, t){
    this._ract.push([t, MG, n]);
    this._arat_dirty = true;
}

function addGasWorker(n, t){
    this._ract.push([t, GW, n]);
    this._arat_dirty = true;
}

function removeMinWorker(n, t){
    this._ract.push([t, ML, 0-n]);
    this._arat_dirty = true;
}

function removeGasWorker(n, t){
    this._ract.push([t, GW, 0-n]);
    this._arat_dirty = true;
}

function addMin(m, t){
    this._ract.push([t, IM, m]);
    this._arat_dirty = true;
}

function addGas(m, t){
    this._ract.push([t, IG, m]);
    this._arat_dirty = true;
}

function removeMin(m, t){
    this._ract.push([t, IM, 0-m]);
    this._arat_dirty = true;
}

function removeGas(m, t){
    this._ract.push([t, IG, 0-m]);
    this._arat_dirty = true;
}

function updateARAT(){
    if (!this._arat_dirty){ //clean
        return;
    }
    var s_ract = this._ract.sort(function(a, b){return b[0] - a[0];});
    var mb = 0; //mining base
    var mg = 0; //mining geyser
    var mw = 0; //mineral worker
    var gw = 0; //gas worker
    var ml = 0; //mule worker
    
    this._arat = [[0,0]]; //initial value
    for (var i = 1; i < this.duration; i++){
        var addmin = Math.min(mw*MIN_RATE_16p, mb*16*MIN_RATE_16p)+ml*MIN_RATE_MULE
        var addgas;
        if (gw <= mg*2){
            addgas = gw*GAS_RATE_2p;
        }else if(gw <= mg*3){
            addgas = gw*GAS_RATE_3p;
        }else{
            addgas = mg*3*GAS_RATE_3p;
        }
        
        this._arat.push([this._arat[i-1][0]+addmin, this._arat[i-1][1]+addgas]);
        while (s_ract.length > 0 && s_ract[s_ract.length-1][0] <= i){
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
                this._arat[i][0] += rac[2];
            }else if (rac[1] == IG){
                this._arat[i][1] += rac[2];
            }
        }
    }
}

function getGas(t){
    this.updateARAT();
    return this._arat[t][1];
}

function getMin(t){
    this.updateARAT();
    return this._arat[t][0];
}

function NewResource(){
  var resource = {
    _arat:[],
    _ract:[],
    _arat_dirty:true,
    init:init,
    duration:600,
    addMinWorker:addMinWorker,
    addMuleWorker:addMuleWorker,
    addMiningBase:addMiningBase,
    addGeyser:addGeyser,
    addGasWorker:addGasWorker,
    removeMinWorker:removeMinWorker,
    removeGasWorker:removeGasWorker,
    addMin:addMin,
    addGas:addGas,
    removeMin:removeMin,
    removeGas:removeGas,
    updateARAT:updateARAT,
    getGas:getGas,
    getMin:getMin,
  };
  resource.init();
  return resource;
}


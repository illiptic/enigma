var utils = module.require('./utils.js');

function Rotor(permutation, position, notches){
  /* PRIVATE */
  this._permutation = permutation;
  this._originalPos = position ? utils.toNum(position)[0] : 0;
  this._mapForward = [];
  this._mapBackward = [];
  this._notches = notches ? utils.toNum(notches) : [];
  this._pos = this._originalPos;
  
  if(permutation){
    var arr = utils.toNum(permutation);
    for(var i = 0; i < 26; i++){
      var value = (arr[i] + this._pos)% 26;
      var index = (i + this._pos)% 26;
      this._mapForward[i] = value;
      this._mapBackward[value] = i;
    }
  };
}

/* PUBLIC */
Rotor.prototype.goThrough = function(val, backwards){
  if(backwards){
    return this._mapBackward[val];
  } else {
    return this._mapForward[val];
  }
}

Rotor.prototype.rotate = function(){
  // rotate the map: 
  // 4 -> 6, 5 -> 19 becomes:
  // 3 -> 5, 4 -> 18
  this._mapForward = this._mapForward.map(function(i){ return (i+25)%26; });
  this._mapForward.push(this._mapForward.shift());
  // 6 -> 4, 19 -> 5 becomes
  // 5 -> 3, 18 -> 4
  this._mapBackward = this._mapBackward.map(function(i){ return (i+25)%26; });
  this._mapBackward.push(this._mapBackward.shift());
  
  this._pos = (this._pos + 1)%26;
  
  return this._notches.indexOf(this._pos) > -1;
}

Rotor.prototype.setPosition = function(pos){
  this._pos = pos ? utils.toNum(pos)[0] : this._originalPos;
  var arr = utils.toNum(this._permutation);
  for(var i = 0; i < 26; i++){
    var value = (arr[i] + this._pos)% 26;
    var index = (i + 26 - this._pos)% 26;
    this._mapForward[i] = value;
    this._mapBackward[value] = i;
  }
}

module.exports = Rotor;
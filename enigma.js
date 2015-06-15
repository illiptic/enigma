var utils = module.require('./utils.js');
var Rotor = module.require('./rotor.js');

var Enigma = function(rotor1, rotor2, rotor3){
  /* PRIVATE */
  //defaults:
  var ROTOR1 = 'DMTWSILRUYQNKFEJCAZBPGXOHV';
  var ROTOR2 = 'HQZGPJTMOBLNCIFDYAWVEUSRKX';
  var ROTOR3 = 'UQNTLSZFMREHDPXKIBVYGJCWOA';
  var REFLECTOR = 'EJMZALYXVBWFCRQUONTSPIKHGD';
  
  this._r1 = new Rotor(rotor1 || ROTOR1, 'D', 'B');
  this._r2 = new Rotor(rotor2 || ROTOR2, 'A', 'A');
  this._r3 = new Rotor(rotor3 || ROTOR3, 'A');
  this._reflector = utils.toNum(REFLECTOR);
}

Enigma.prototype._encode = function(char){
  var endval = 
  this._r3.goThrough(
    this._r2.goThrough(
      this._r1.goThrough(char)
    )
  );
  
  return this._r1.goThrough(
    this._r2.goThrough(
      this._r3.goThrough(
        this._reflector[endval], true
      ), true
    ), true
  );
};


/* PUBLIC */
Enigma.prototype.type = function(inputText){
  var input = utils.toNum(inputText);
  var encoded = input.map(function(char){
      if(char < 0 || char > 25){
        return char;
      } else {
        var output = this._encode(char);
        // rotate r1, 
        // if it returns true (meaning the notch is present) => rotate r2
        this._r1.rotate() && this._r2.rotate() && this._r3.rotate();
        return output;
      }
  }.bind(this));
  
  return utils.toStr(encoded);
};

Enigma.prototype.reset = function(phrase){
  // reverse and split pass phrase, because we read from left to right, but rotors
  // are positionned from right to left.
  var pos = phrase.split('').reverse();
  this._r1.setPosition(pos[0]);
  this._r2.setPosition(pos[1]);
  this._r3.setPosition(pos[2]);
};

Enigma.prototype.test = function(char){
  return this._reflector[char];
};

module.exports = Enigma;
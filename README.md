# Enigma machine for node!

## Initialize the machine:

```javascript
var Enigma = module.require('./enigma.js');

var e = new Enigma();
```

## Type stuff!

```javascript
console.log(e.type('Hallo Welt!'));
```

## To decode, reset the rotors:

```javascript
e.reset('');
```

## Check out more examples in runEnigma.js
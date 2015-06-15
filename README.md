# Enigma machine for node!

1. Initialize the machine:

```javascript
var Enigma = module.require('./enigma.js');

var e = new Enigma();
```

2. Type stuff!

```javascript
console.log(e.type('Hallo Welt!'));
```

3. To decode, reset the rotors:

```javascript
e.reset('');
```

4. Check out more examples in runEnigma.js
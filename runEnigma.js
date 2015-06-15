var Enigma = module.require('./enigma.js');

var e = new Enigma();

console.log('Encode: ');
console.log(e.type('Hi there! My name is Jeremy. THomas is impressed!'));
e.reset('');
console.log('Decode: ');
console.log(e.type('WD OMFAT! PJ YMPJ TZ PQYAHZ. BVKDWK KD YXSIBHGPA!'));

console.log('Encode with different position: ');
e.reset('ACG');
console.log(e.type('Hi there! My name is Jeremy. THomas is impressed!'));
e.reset('ACG');
console.log('Decode with different position: ');
console.log(e.type('KJ ZCVXG! XZ KUXO VM LRAVRE. HLLHZU GW WHRKIXBZL!'));
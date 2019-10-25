const readline = require("readline");
const Enigma = require("./enigma.js");

const e = new Enigma();

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//TODO
function help() {
  console.log(`Instructions:
    Type and enter to encrypt text.

    Special commands:
      -h  Prints these instructions
      -r [ABC] Reset the rotors to [default/specified] position
  `);
}

function prompt() {
  io.question("> ", a => {
    const command = a.slice(0, 2);
    const args = a.slice(3).trim();
    switch (command) {
      case "-r":
        if (args.length && args.length !== 3) {
          console.log(
            "Reset requires three letters (each rotor's position) or none (for the default)"
          );
        } else {
          e.reset(args);
          console.log("Enigma reset");
        }
        break;
      case "-h":
        help();
        break;
      default:
        console.log(e.type(a));
    }
    prompt();
  });
}

help();
prompt();

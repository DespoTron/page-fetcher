const request = require('request');
const fs = require('fs');
const readline = require('readline');

const args = process.argv;

request(args[2], (error, response, body) => {
  console.log('error', error);
  console.log('statusCode:', response && response.statusCode);
  //console.log('body', body); // Do we need this?
  
  fs.writeFile(args[3], body, function (err) {
    if (err) {
      throw err;
    } else if (args[3]) {
      console.log(`Downloaded and saved ${body.length} bytes to ${args[3]}`)
    }
  })
  
  const rl = readline.createInterface(process.stdin, process.stdout);
  rl.question("Overwrite? [yes]/no: ", function(answer) {
    if(answer == "no") {
      console.log("Not overwriting, bye.");
      process.exit();
    } else {
      console.log(`Overwriting file: ${args[3]}`);
    }
    rl.close();
  })

});




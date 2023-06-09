var Raspi = require('raspi-io').RaspiIO;
var five = require('johnny-five');
var board = new five.Board({io: new Raspi()});
const { spawn } = require('child_process');



board.on('ready', () => {
  var motion = new five.Motion('P1-7')

  motion.on('motionstart', () => {
    var still = spawn('raspistill', ['-t', '2000', '-o', 'image.jpg'])
    console.log('movement');
    still.stderr.on('data', (code) => {
      console.error(`child stderr:\n${code}`)
    })
    still.on('exit',(code) => {
      console.log(`exited with code ${code}`)
    })
  })
})

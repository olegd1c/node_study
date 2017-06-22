console.log('Starting app');

const fs = require('fs');
const os = require('os');
const jf = require('jsonfile');

const fileName = 'greetings.txt';
const fileJson = 'greetings.json';

//1
let user = os.userInfo();
fs.appendFileSync(fileName, (new Date()).toLocaleDateString()+'. Hello '+user.username+'!\n');

//2
let obj = jf.readFileSync(fileJson);
console.log(obj);

//3
jf.readFile(fileJson, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
  console.dir(data);
});
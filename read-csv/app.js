var fs = require('fs');
var csv = require("fast-csv");

var streamData = [];
let files = ['my.csv', 'my2.csv'];
let index = 0;
let line = 1;

files.forEach((item) => {
    var stream = fs.createReadStream(item);
    var csvStream = csv({ delimiter: ';' })
        .on("data", function (data) {
            let people = {
                line: line,
                name: data[1],
                inn: data[2],
                sum: Number(data[3]),
                sum18: Math.round(Number(data[3]) * 0.18 * 100) / 100,
                sum20: Math.round(Number(data[3]) * 0.20 * 100) / 100,
                sum1_5: Math.round(Number(data[3]) * 0.015 * 100) / 100,
            }

            let indexElem = undefined;

            streamData.forEach((item,index) => {
                if(item.inn == people.inn){
                    indexElem = index;
                }
            });

            if(indexElem != undefined) {
                tempElem = streamData[indexElem];

                tempElem.sum = tempElem.sum + people.sum;
                tempElem.sum18 = Math.round(tempElem.sum * 0.18 * 100) / 100,
                tempElem.sum20 = Math.round(tempElem.sum * 0.20 * 100) / 100,
                tempElem.sum1_5 = Math.round(tempElem.sum * 0.015 * 100) / 100,

                streamData[indexElem] = tempElem;

            } else {
                streamData.push(people);
                line = line+1;
            }
        })
        .on("end", function () {
            index = index + 1;
            if (index == 2) {
                console.log("done: " + index);
                console.log(streamData);

                var ws = fs.createWriteStream("my_rezult.csv");
                csv.write(streamData, 
                        { headers: true, delimiter: ';' })
                    .pipe(ws);
            }
        });

    stream.pipe(csvStream);
});
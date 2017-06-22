const _ =require('lodash');

console.log(_.isString(true));
console.log(_.isString('true'));

let filteredArray = _.uniq(['Add',15,'read',65,'read',15,85,65]);
console.log(filteredArray);

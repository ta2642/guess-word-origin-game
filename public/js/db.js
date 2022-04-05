const file = require('./file')

console.log(file.pi)

const dblist = file.dblist

//console.log(dblist);

const randomItem = dblist[Math.floor(Math.random()*dblist.length)];

const list = randomItem.split(/,/)
const option = Math.floor(Math.random()*list.length)
console.log(list)
console.log(option)
console.log(list[option])
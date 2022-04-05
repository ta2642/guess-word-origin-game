const fs = require('fs')

const dblist = [];
var pi = 3.142;


const allFileContents = fs.readFileSync('../equi-list.csv', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line =>  {
    //console.log(`${line}`);
    dblist.push(line)
    line.split(/,/).forEach(word => {
        //console.log(`word from file: ${word}`);
    })
  
});
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
//console.log(dblist)


module.exports = {
    dblist: dblist,
    pi: pi
}




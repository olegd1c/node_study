var path = require('path');
var copydir = require('copy-dir');
const yargs = require('yargs');

const excludeDir = ['node_modules','dist','vendor'];
const excludePath = [];

const fromOptions = {
    description: 'Directory from',
    demand: true, //обязательный
    alias: 'f'
};

const toOptions = {
    description: 'Directory to',
    demand: true,
    alias: 't'
};

const archiveOptions = {
    description: 'Archive directory',
    demand: false,
    alias: 'a'
};

const argv = yargs
    .command('copy', 'Copy dir', {
        from: fromOptions,
        to: toOptions,
        archive: archiveOptions
    })
    .help()
    .argv;

var command = argv._[0];

if(command === 'copy') {    
    copydir(argv.from, argv.to, 
        function (stat, filepath, filename) {        
            if(stat === 'file' && excludePath.filter(item => item === path.extname(filepath)).length > 0) {
                return false;
            } else if (stat === 'directory' && excludeDir.filter(item => item === filename).length > 0) {
                return false;
            }

            return true;
    }, function (err) {
        console.log(err);
    });
}    

console.log('ok');
var path = require('path');
var copydir = require('copy-dir');
var rmdir = require('rmdir');
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

const dirOptions = {
    description: 'Delete directory',
    demand: true,
    alias: 'd'
};

const argv = yargs
    .command('copy', 'Copy dir', {
        from: fromOptions,
        to: toOptions,
        archive: archiveOptions
    })
    .command('delete', 'Delete dir', {
        dir: dirOptions,
    })    
    .help()
    .argv;

var command = argv._[0];

if (command === 'copy') {    
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
} else if (command === 'delete') {
    excludeDir.forEach((item)=>{
        rmdir(argv.dir+'/'+item, function (err, dirs, files) {   
            if(dirs && dirs.length > 0){
                console.log('all files are removed: '+item);
                //console.log(dirs);
                //console.log(files);                
            }
        });
    })
}    

console.log('ok');
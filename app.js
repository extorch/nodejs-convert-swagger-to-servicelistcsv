const fs = require('fs');
const yargs = require('yargs');


// Customize yargs version
yargs.version('1.0.0');

// Create convert command
yargs.command({
    command: 'convert',
    describe: 'Convert Swagger to Service List in CSV',
    builder: {
        in: {
            describe: 'File to be converted',
            demandOption: true,
            type: 'string'
        },
        out: {
            describe: 'File to be created',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        // read file
        const file = fs.readFileSync(argv.in);
        
        // parse file JSON to object
        const parsedObject = JSON.parse(file.toString());
        
        // split paths
        var servicosArr = [];
        for(var k in parsedObject.paths) servicosArr.push(k);
        
        // merge paths in csv like file
        const servicesList = servicosArr.join(", ");
        // output file
        fs.writeFileSync(argv.out, servicesList);
    }
});

yargs.parse();
const fs = require('fs')
const path = require('path')
const readline = require('readline')


var csvToJson = (csvFile = 'customer-data.csv') => {
	var rdf = readline.createInterface({
		input: fs.createReadStream(path.join(__dirname, csvFile)),
		output: process.stdout,
		console: false
	});

	var i = 0;
	var keys;
	var results = [];

	// Read file line by line, store the objects into array
	rdf.on('line', function(line) {
		if(i==0){
			keys = line.split(',');	
		}else {
			var values =  line.split(',');
			var obj = {};
			for(var j=0; j<values.length; j++){
				if(values != ''){
					obj[keys[j]] =  values[j]; // making the objects of each line
				}
			}
			// If object is not empty
			if(Object.keys(obj).length > 0){
			   results.push(obj);
			}
		}
		i++;
	});

	//After reading, the result will  be written in converteddata.json if it's 1000 or more
	rdf.on('close', function (line) {
		if(results.length > 999){
			fs.writeFile('converteddata.json', JSON.stringify(results, null, 2), function (error) {
			  if (error) return console.error(error)
			  console.log('Successfully converted CSV file to JSON file converteddata.json')
			})
		}else {
			console.log('You are tyring to write number of ' + results.length + ' data,' + " Only 1000 or more are allowed");
		}
	})
}

csvToJson(process.argv[2])






